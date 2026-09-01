<template>
  <!-- Trail de prints seguindo o mouse (ref. Federico Pian). Fica FORA do
       elemento pinado: position fixed dentro de container com transform quebra. -->
  <div ref="layer" class="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true" />
</template>

<script setup>
const props = defineProps({
  images: { type: Array, required: true },
  active: { type: Boolean, default: false },
});

const layer = ref(null);
const { pop } = usePopSound({ volume: 0.03 });

const SPAWN_DISTANCE = 130; // px de movimento entre um print e outro
const MAX_LIVE = 8;

let lastX = -Infinity;
let lastY = -Infinity;
let cursor = 0;

function onMove(e) {
  if (!props.active || !layer.value) return;
  // Prints só na área vazia: sobre conteúdo/chrome o trail não nasce.
  if (e.target instanceof Element && e.target.closest("[data-trail-block]")) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  if (dx * dx + dy * dy < SPAWN_DISTANCE * SPAWN_DISTANCE) return;
  lastX = e.clientX;
  lastY = e.clientY;
  spawn(e.clientX, e.clientY);
}

function spawn(x, y) {
  const { $gsap } = useNuxtApp();
  if (!$gsap || !props.images.length) return;

  const img = document.createElement("img");
  img.src = props.images[cursor % props.images.length];
  cursor += 1;
  img.className = "freelaa-trail-img";
  pop();
  img.draggable = false;
  layer.value.appendChild(img);

  while (layer.value.children.length > MAX_LIVE) {
    layer.value.firstChild.remove();
  }

  $gsap.fromTo(
    img,
    { x, y, xPercent: -50, yPercent: -50, rotation: $gsap.utils.random(-9, 9), scale: 0.5, autoAlpha: 0 },
    {
      scale: 1,
      autoAlpha: 1,
      duration: 0.28,
      ease: "power3.out",
      onComplete: () => {
        $gsap.to(img, {
          autoAlpha: 0,
          scale: 0.9,
          y: y + 28,
          duration: 0.34,
          delay: 0.1,
          ease: "power2.in",
          onComplete: () => img.remove(),
        });
      },
    },
  );
}

onMounted(() => window.addEventListener("mousemove", onMove, { passive: true }));
onUnmounted(() => window.removeEventListener("mousemove", onMove));

// Troca de case: zera o ciclo pra começar do primeiro print do case novo.
watch(
  () => props.images,
  () => {
    cursor = 0;
  },
);
</script>

<style>
/* Global de propósito: os <img> são criados via DOM, fora do escopo do SFC. */
.freelaa-trail-img {
  position: absolute;
  top: 0;
  left: 0;
  width: clamp(132px, 12.5vw, 208px);
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
  will-change: transform, opacity;
  visibility: hidden;
}
</style>
