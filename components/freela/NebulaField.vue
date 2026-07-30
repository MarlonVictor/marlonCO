<template>
  <div
    ref="rootRef"
    class="pointer-events-none absolute inset-0 overflow-hidden bg-[#09090b]"
  >
    <canvas ref="canvasRef" class="absolute inset-0 h-full w-full" />

    <!-- Vinheta: escurece as bordas e joga o foco no centro -->
    <div
      class="pointer-events-none absolute inset-0"
      style="
        background: radial-gradient(
          ellipse 75% 65% at 60% 45%,
          transparent 0%,
          rgba(9, 9, 11, 0.32) 78%,
          #09090b 100%
        );
      "
    />

    <!-- Scrim à esquerda: o hero é alinhado à esquerda, o texto precisa ganhar. -->
    <div
      class="pointer-events-none absolute inset-y-0 left-0 hidden w-[70%] md:block"
      style="
        background: linear-gradient(
          to right,
          #09090b 0%,
          rgba(9, 9, 11, 0.82) 35%,
          rgba(9, 9, 11, 0.45) 70%,
          transparent 100%
        );
      "
    />

    <!-- No mobile o texto ocupa a largura toda: scrim chapado em vez de lateral. -->
    <div class="pointer-events-none absolute inset-0 bg-[#09090b]/60 md:hidden" />

    <!-- Emenda com o fundo da página -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#09090b]"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  // Partículas no desktop. Cai automaticamente em telas pequenas.
  count: { type: Number, default: 42000 },
  // Centro da nuvem, normalizado no container. Deslocado à direita porque o
  // texto do hero é alinhado à esquerda.
  centerX: { type: Number, default: 0.6 },
  centerY: { type: Number, default: 0.46 },
  // Raio como fração da menor dimensão do container.
  radiusScale: { type: Number, default: 0.46 },
  // Raio de influência do cursor e força do empurrão, em px.
  mouseRadius: { type: Number, default: 220 },
  mousePush: { type: Number, default: 48 },
});

const rootRef = ref(null);
const canvasRef = ref(null);

// Divisor da resolução da camada de bloom. O upscale bilinear do browser
// faz o papel do blur de graça.
const BLOOM_DIV = 5;

// Rampa de calor: a cor sai da densidade acumulada, não da profundidade.
// É o que gera o laranja/branco onde a casca se dobra sobre si mesma.
const STOPS = [
  [0.0, 9, 9, 11],
  [0.05, 58, 7, 3],
  [0.13, 122, 15, 4],
  [0.26, 182, 32, 7],
  [0.44, 228, 68, 14],
  [0.66, 255, 122, 46],
  [1.0, 255, 222, 186],
];

// LUT de 256 entradas em Uint32 (ABGR little-endian) a partir dos stops.
const buildLut = (dark) => {
  const lut = new Uint32Array(256);

  for (let i = 0; i < 256; i++) {
    const t = i / 255;

    let a = STOPS[0];
    let b = STOPS[STOPS.length - 1];
    for (let s = 0; s < STOPS.length - 1; s++) {
      if (t >= STOPS[s][0] && t <= STOPS[s + 1][0]) {
        a = STOPS[s];
        b = STOPS[s + 1];
        break;
      }
    }

    const span = b[0] - a[0];
    const f = span > 0 ? (t - a[0]) / span : 0;

    let r = a[1] + (b[1] - a[1]) * f;
    let g = a[2] + (b[2] - a[2]) * f;
    let bl = a[3] + (b[3] - a[3]) * f;

    // A camada de bloom entra com "lighter": precisa partir do preto para
    // não clarear o fundo inteiro.
    if (dark) {
      const k = 0.72;
      r = Math.max(0, r - STOPS[0][1]) * k;
      g = Math.max(0, g - STOPS[0][2]) * k;
      bl = Math.max(0, bl - STOPS[0][3]) * k;
    }

    lut[i] = (255 << 24) | (Math.round(bl) << 16) | (Math.round(g) << 8) | Math.round(r);
  }

  return lut;
};

onMounted(() => {
  const canvas = canvasRef.value;
  const root = rootRef.value;
  if (!canvas || !root) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // `count` é calibrado para uma área de referência (~1440x800). Em telas
  // menores reduz proporcionalmente para não gastar CPU à toa.
  const REF_AREA = 1440 * 800;
  const REF_DENSITY = props.count / REF_AREA;

  // Os arrays são alocados uma única vez, então a área precisa ser plausível
  // já na montagem — se o layout ainda não resolveu, estima pela viewport.
  const startRect = root.getBoundingClientRect();
  const startArea =
    startRect.width > 1 && startRect.height > 1
      ? startRect.width * startRect.height
      : window.innerWidth * window.innerHeight * 0.8;
  const total = Math.max(
    3000,
    Math.round(props.count * Math.min(1, startArea / REF_AREA)),
  );

  const mainLut = buildLut(false);
  const bloomLut = buildLut(true);

  const bloomCanvas = document.createElement("canvas");
  const bloomCtx = bloomCanvas.getContext("2d", { alpha: false });

  // Geometria: direção unitária + raio base por partícula, em arrays planos.
  const ux = new Float32Array(total);
  const uy = new Float32Array(total);
  const uz = new Float32Array(total);
  const baseR = new Float32Array(total);
  const phase = new Float32Array(total);
  const amp = new Float32Array(total);
  const weight = new Uint8Array(total);

  for (let i = 0; i < total; i++) {
    // Distribuição uniforme na esfera (evita o acúmulo nos polos).
    const u = Math.random() * 2 - 1;
    const theta = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const x = s * Math.cos(theta);
    const y = s * Math.sin(theta);
    const z = u;

    // Ruído de baixa frequência na direção: transforma a esfera limpa numa
    // nuvem com grumos e filamentos, sem precisar de simplex noise.
    const lump =
      1 +
      0.17 * Math.sin(3.1 * x + 2.3 * y) * Math.cos(2.6 * z + 1.4) +
      0.1 * Math.sin(5.7 * z - 4.1 * x) +
      0.06 * Math.cos(8.3 * y + 6.1 * z);

    // Casca com espessura: o expoente baixo concentra a massa perto da borda.
    const shell = 0.68 + 0.32 * Math.random() ** 0.4;

    ux[i] = x;
    uy[i] = y;
    uz[i] = z;
    baseR[i] = shell * lump;
    phase[i] = Math.random() * Math.PI * 2;
    amp[i] = 0.012 + Math.random() * 0.045;
    // Brilho individual: a maioria fraca, algumas bem acesas.
    weight[i] = 11 + Math.round(Math.random() ** 2.4 * 76);
  }

  let w = 0;
  let h = 0;
  let bufW = 0;
  let bufH = 0;
  let bloomW = 0;
  let bloomH = 0;
  let cx = 0;
  let cy = 0;
  let radius = 0;
  let fov = 0;
  let renderScale = 1;
  let brightness = 1;

  let intensity = null;
  let bloomIntensity = null;
  let imageData = null;
  let pixels = null;
  let bloomImageData = null;
  let bloomPixels = null;

  const resize = () => {
    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    w = rect.width;
    h = rect.height;

    // O trabalho é por pixel (LUT + putImageData), então o buffer é em px de
    // CSS — não no DPR — e ainda tem teto de área. O upscale do browser faz o
    // resto, e o leve amaciamento até ajuda o granulado.
    const MAX_PIXELS = 1440 * 800;
    const cssArea = w * h;
    renderScale = cssArea > MAX_PIXELS ? Math.sqrt(MAX_PIXELS / cssArea) : 1;

    const nextW = Math.max(1, Math.round(w * renderScale));
    const nextH = Math.max(1, Math.round(h * renderScale));

    // O ResizeObserver dispara a cada frame do arrasto: só realoca os buffers
    // se as dimensões realmente mudaram.
    if (nextW !== bufW || nextH !== bufH) {
      bufW = nextW;
      bufH = nextH;

      canvas.width = bufW;
      canvas.height = bufH;

      bloomW = Math.max(1, Math.ceil(bufW / BLOOM_DIV));
      bloomH = Math.max(1, Math.ceil(bufH / BLOOM_DIV));
      bloomCanvas.width = bloomW;
      bloomCanvas.height = bloomH;

      intensity = new Uint8Array(bufW * bufH);
      bloomIntensity = new Uint8Array(bloomW * bloomH);

      imageData = ctx.createImageData(bufW, bufH);
      pixels = new Uint32Array(imageData.data.buffer);

      bloomImageData = bloomCtx.createImageData(bloomW, bloomH);
      bloomPixels = new Uint32Array(bloomImageData.data.buffer);
    }

    // Menos pixels com o mesmo número de partículas = mais densidade por
    // pixel = imagem mais clara. Normaliza para o brilho não variar com o
    // tamanho da viewport.
    const density = total / (bufW * bufH);
    brightness = Math.min(1.25, Math.max(0.3, REF_DENSITY / density));

    cx = bufW * props.centerX;
    cy = bufH * props.centerY;
    radius = Math.min(bufW, bufH) * props.radiusScale;
    fov = radius * 2.6;
  };

  // Cursor em coordenadas do buffer. Fora da tela = neutro.
  let mx = -9999;
  let my = -9999;
  let hasMouse = false;
  let targetRotX = 0;
  let targetRotY = 0;

  const onPointerMove = (e) => {
    const rect = root.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    mx = nx * bufW;
    my = ny * bufH;
    hasMouse = true;
    targetRotY = (nx - 0.5) * 0.8;
    targetRotX = (ny - 0.5) * -0.55;
  };

  const onPointerLeave = () => {
    hasMouse = false;
    mx = my = -9999;
    targetRotX = 0;
    targetRotY = 0;
  };

  let rotX = 0;
  let rotY = 0;
  let spin = 0;
  let raf = null;
  let running = true;
  let last = 0;

  const draw = (now) => {
    if (!intensity) {
      if (running) raf = requestAnimationFrame(draw);
      return;
    }

    // dt normalizado a 60fps, limitado para não dar salto após aba inativa.
    const dt = last ? Math.min((now - last) / 16.667, 3) : 1;
    last = now;

    const t = now * 0.001;
    spin += 0.0021 * dt;
    rotY += (targetRotY - rotY) * 0.045 * dt;
    rotX += (targetRotX - rotX) * 0.045 * dt;

    const ay = spin + rotY;
    const cosY = Math.cos(ay);
    const sinY = Math.sin(ay);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    intensity.fill(0);
    bloomIntensity.fill(0);

    const mRad = props.mouseRadius;
    const mPush = props.mousePush;
    const rad2 = mRad * mRad;
    const invDiam = 1 / (radius * 2);
    const bright = brightness;

    for (let i = 0; i < total; i++) {
      const r = radius * baseR[i] * (1 + amp[i] * Math.sin(t * 0.5 + phase[i]));

      const x = ux[i] * r;
      const y = uy[i] * r;
      const z = uz[i] * r;

      const x1 = x * cosY + z * sinY;
      const z1 = z * cosY - x * sinY;
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const denom = fov + z2;
      if (denom <= 1) continue;

      const k = fov / denom;
      let sx = cx + x1 * k;
      let sy = cy + y2 * k;

      // Repulsão local: só as partículas próximas do cursor pagam o sqrt.
      if (hasMouse) {
        const dx = sx - mx;
        const dy = sy - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < rad2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = 1 - d / mRad;
          const push = (mPush * f * f) / d;
          sx += dx * push;
          sy += dy * push;
        }
      }

      const xi = sx | 0;
      const yi = sy | 0;
      if (xi < 0 || xi >= bufW || yi < 0 || yi >= bufH) continue;

      // Profundidade só modula o brilho: 1 = mais perto da câmera.
      let dn = 0.5 - z2 * invDiam;
      if (dn < 0) dn = 0;
      else if (dn > 1) dn = 1;

      const v = (weight[i] * bright * (0.35 + 1.3 * dn * dn)) | 0;

      const idx = yi * bufW + xi;
      const cur = intensity[idx] + v;
      intensity[idx] = cur > 255 ? 255 : cur;

      const bIdx = ((yi / BLOOM_DIV) | 0) * bloomW + ((xi / BLOOM_DIV) | 0);
      const bCur = bloomIntensity[bIdx] + (v >> 1);
      bloomIntensity[bIdx] = bCur > 255 ? 255 : bCur;
    }

    // Intensidade -> cor, via LUT. Alfa já vem 255 nas duas LUTs.
    for (let p = 0, n = bufW * bufH; p < n; p++) {
      pixels[p] = mainLut[intensity[p]];
    }
    ctx.globalCompositeOperation = "source-over";
    ctx.putImageData(imageData, 0, 0);

    for (let p = 0, n = bloomW * bloomH; p < n; p++) {
      bloomPixels[p] = bloomLut[bloomIntensity[p]];
    }
    bloomCtx.putImageData(bloomImageData, 0, 0);

    // Bloom: upscale bilinear em duas passadas para amaciar o blocado.
    ctx.globalCompositeOperation = "lighter";
    ctx.globalAlpha = 0.85;
    ctx.drawImage(bloomCanvas, 0, 0, bufW, bufH);
    ctx.globalAlpha = 0.4;
    ctx.drawImage(bloomCanvas, -BLOOM_DIV, -BLOOM_DIV, bufW, bufH);
    ctx.globalAlpha = 1;

    if (running) raf = requestAnimationFrame(draw);
  };

  resize();

  if (reduceMotion) {
    // Sem animação: um único frame estático, ainda decorativo.
    running = false;
    requestAnimationFrame(draw);
  } else {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave, { passive: true });
    raf = requestAnimationFrame(draw);
  }

  // Só anima enquanto a section estiver visível.
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (reduceMotion) return;

      if (entry.isIntersecting && !running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(draw);
      } else if (!entry.isIntersecting && running) {
        running = false;
        if (raf) cancelAnimationFrame(raf);
        raf = null;
      }
    },
    { threshold: 0 },
  );
  observer.observe(root);

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);

  onUnmounted(() => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    observer.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerleave", onPointerLeave);
  });
});
</script>
