<template>
  <div class="freelaa-page relative min-h-screen bg-gray-950 text-offwhite-100">
    <!-- Nav mínima: navegação sai da frente, conversão (WhatsApp) nunca some. -->
    <header data-trail-block class="freelaa-topbar fixed z-30 flex items-center justify-between">
      <NuxtLink
        to="/freelaa"
        class="font-mono-code text-xs uppercase tracking-widest text-gray-700 transition-colors hover:text-gray-950"
        data-cursor-hover="voltar"
      >
        ← мᴀʀʟᴏɴ.ᴄᴏ
      </NuxtLink>
      <a
        :href="link()"
        target="_blank"
        rel="noopener"
        class="rounded-full bg-gray-950 px-5 py-2 font-mono-code text-xs uppercase tracking-widest text-offwhite-100 transition-colors hover:bg-primary-500"
        data-cursor-hover="falar"
      >
        Falar comigo
      </a>
    </header>

    <!-- Deck de cases: desktop vira pilha pinada com transição de carta;
         mobile / reduced-motion fica stack vertical comum. -->
    <section
      ref="deckEl"
      class="freelaa-deck relative"
      :style="{ '--slides': cases.length }"
      aria-label="Cases"
    >
      <div class="freelaa-stage">
        <FreelaaCaseSlide
          v-for="(item, i) in cases"
          :key="item.slug"
          :case-data="item"
          :index="i"
          :is-active="activeIndex === i"
          :cta-href="link()"
        />
      </div>
    </section>

    <FreelaaCasesCounter
      :index="activeIndex"
      :total="cases.length"
      :deck="deckReady"
      @prev="goTo(activeIndex - 1)"
      @next="goTo(activeIndex + 1)"
    />

    <!-- Indicador de scroll (desktop): some no último case. -->
    <div
      data-trail-block
      class="freelaa-scroll fixed z-30 hidden items-center gap-3 transition-opacity duration-500 lg:flex"
      :class="deckReady && activeIndex < cases.length - 1 ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    >
      <span class="font-mono-code text-[10px] uppercase tracking-[0.35em] text-gray-700">scroll</span>
      <span class="freelaa-scroll-mouse"><i /></span>
    </div>

    <FreelaaCasesTrail :images="activeImages" :active="trailEnabled" />
  </div>
</template>

<script setup>
import data from "~/assets/data/freela-cases.json";

const cases = data.cases;
const { link } = useFreelaWhatsApp();

if (import.meta.dev && cases.some((c) => c.placeholder)) {
  console.warn(
    "[freelaa/cases] Há cases com \"placeholder\": true em freela-cases.json — trocar por cases reais antes de publicar.",
  );
}

const deckEl = ref(null);
const deckReady = ref(false);
const trailEnabled = ref(false);
const activeIndex = ref(0);
const activeImages = computed(() => cases[activeIndex.value].images);

let deckST = null;

const isDesktop = () =>
  import.meta.client && window.matchMedia("(min-width: 1024px)").matches;

useGsapSection(deckEl, ({ gsap }) => {
  if (!isDesktop()) return;

  const root = deckEl.value;
  root.classList.add("is-deck");

  const slides = gsap.utils.toArray(".freelaa-slide", root);
  const n = slides.length;

  slides.forEach((el, i) => {
    gsap.set(el, { zIndex: i + 1 });
    if (i > 0) gsap.set(el, { yPercent: 100 });
  });

  // Sem `pin`: o palco é sticky no CSS. O pin do ScrollTrigger escreve width
  // inline em px no elemento e a carta acabava alguns px mais larga que o
  // palco, comendo a margem de um dos lados.
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      snap: {
        snapTo: 1 / (n - 1),
        duration: { min: 0.25, max: 0.6 },
        delay: 0.05,
        ease: "power3.out",
      },
      onUpdate: (self) => {
        activeIndex.value = Math.min(n - 1, Math.round(self.progress * (n - 1)));
      },
    },
  });

  slides.forEach((el, i) => {
    if (i === 0) return;
    // A carta nova entra por cima já no tamanho final; a anterior
    // diminui e "vai para trás" (escala + escurece), ref. Ilja van Eck.
    tl.fromTo(el, { yPercent: 104 }, { yPercent: 0, ease: "none", duration: 1 }, i - 1);
    tl.to(
      slides[i - 1],
      { scale: 0.9, autoAlpha: 0.55, ease: "none", duration: 1 },
      i - 1,
    );
  });

  deckST = tl.scrollTrigger;
  deckReady.value = true;
  trailEnabled.value = window.matchMedia("(pointer: fine)").matches;

  return () => {
    root.classList.remove("is-deck");
    deckST = null;
    deckReady.value = false;
    trailEnabled.value = false;
  };
});

// Mobile (sem deck): acompanha qual slide domina a viewport pras setas/índice.
let observer = null;
onMounted(() => {
  if (isDesktop()) return;
  const slides = deckEl.value?.querySelectorAll(".freelaa-slide") ?? [];
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeIndex.value = [...slides].indexOf(entry.target);
        }
      }
    },
    { threshold: 0.55 },
  );
  slides.forEach((el) => observer.observe(el));
});
onUnmounted(() => observer?.disconnect());

function goTo(i) {
  if (i < 0 || i >= cases.length) return;
  const { $lenis } = useNuxtApp();
  let y;
  if (deckST) {
    y = deckST.start + ((deckST.end - deckST.start) * i) / (cases.length - 1);
  } else {
    const el = deckEl.value?.querySelectorAll(".freelaa-slide")[i];
    if (!el) return;
    y = el.getBoundingClientRect().top + window.scrollY;
  }
  if ($lenis) $lenis.scrollTo(y, { duration: 1 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

useHead({
  title: "Cases — Marlon Coimbra",
  meta: [{ name: "robots", content: "noindex, nofollow" }],
  bodyAttrs: { class: "bg-gray-950" },
  // Scrollbar nativa comeria o respiro da direita da carta; a orientação
  // fica por conta do contador e do indicador de scroll.
  htmlAttrs: { class: "freelaa-cases" },
});
</script>

<style>
/* Não-scoped: alcança <html>, fora da árvore do componente. */
html.freelaa-cases {
  scrollbar-width: none;
}
html.freelaa-cases::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>

<style scoped>
/* Modo deck (desktop + js-anim): palco 100vh, cards absolute com cara de
   carta — cantos arredondados aparecem quando o card de trás recua. */
/* Altura de rolagem = uma tela por carta; o palco fica sticky dentro dela. */
.freelaa-deck.is-deck {
  height: calc(var(--slides) * 100vh);
}
.freelaa-deck.is-deck .freelaa-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}
/* Fora do deck (mobile): cada carta é um bloco com respiro em volta. */
.freelaa-deck :deep(.freelaa-slide) {
  margin: var(--deck-gap);
  min-height: calc(100vh - var(--deck-gap) * 2);
}
/* No deck: carta absoluta com o palco escuro visível em volta (ref. Ilja). */
.freelaa-deck.is-deck :deep(.freelaa-slide) {
  position: absolute;
  inset: var(--deck-gap);
  margin: 0;
  min-height: 0;
  height: auto;
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.5);
}

/* Espaçamento do palco: um só valor governa card, topbar, contador e scroll. */
.freelaa-page {
  --deck-gap: 0.75rem;
}
@media (min-width: 1024px) {
  .freelaa-page {
    --deck-gap: 1.75rem;
  }
}

/* Topbar e rodapé alinhados ao padding interno da carta. */
.freelaa-topbar {
  top: calc(var(--deck-gap) + 1.25rem);
  left: calc(var(--deck-gap) + 1.75rem);
  right: calc(var(--deck-gap) + 1.75rem);
}
.freelaa-counter {
  bottom: calc(var(--deck-gap) + 1.75rem);
  left: calc(var(--deck-gap) + 1.75rem);
}
.freelaa-scroll {
  bottom: calc(var(--deck-gap) + 1.75rem);
  right: calc(var(--deck-gap) + 1.75rem);
}

/* Pílula de mouse: ponto cai dentro do contorno, em loop. */
.freelaa-scroll-mouse {
  display: block;
  width: 18px;
  height: 30px;
  border: 1.5px solid rgba(13, 13, 13, 0.45);
  border-radius: 9999px;
  position: relative;
}
.freelaa-scroll-mouse i {
  position: absolute;
  left: 50%;
  top: 6px;
  width: 3px;
  height: 6px;
  margin-left: -1.5px;
  border-radius: 9999px;
  background: #0d0d0d;
  animation: freelaa-scroll-drop 1.7s cubic-bezier(0.45, 0, 0.2, 1) infinite;
}
@keyframes freelaa-scroll-drop {
  0% { transform: translateY(0); opacity: 0; }
  25% { opacity: 1; }
  75% { transform: translateY(11px); opacity: 1; }
  100% { transform: translateY(13px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .freelaa-scroll-mouse i { animation: none; }
}
</style>
