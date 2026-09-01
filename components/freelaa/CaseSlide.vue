<template>
  <article
    class="freelaa-slide relative overflow-hidden rounded-3xl text-gray-950"
    :style="{
      '--case-color': caseData.color,
      '--case-color-alt': caseData.colorAlt,
      backgroundColor: caseData.tint,
    }"
  >
    <!-- Fundo vivo ref. federicopian.com: blobs saturados nas cores do case
         vagando com movimento visível atrás de blur, sobre base clara. -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="freelaa-blob freelaa-blob--a" />
      <div class="freelaa-blob freelaa-blob--b" />
      <div class="freelaa-blob freelaa-blob--smoke" />
      <div class="freelaa-blob freelaa-blob--light" />
    </div>

    <div
      class="relative z-10 flex min-h-full w-full flex-col items-center justify-center gap-7 px-6 pb-36 pt-28 text-center md:gap-9"
    >
      <div data-trail-block class="flex flex-wrap items-center justify-center gap-3 font-mono-code text-[11px] uppercase tracking-[0.25em] text-gray-700">
        <span>{{ String(index + 1).padStart(2, "0") }}</span>
        <span aria-hidden="true">/</span>
        <span>{{ caseData.segment }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ caseData.year }}</span>
      </div>

      <h2
        data-trail-block
        class="max-w-6xl font-medium italic leading-[0.95] tracking-[-0.03em] text-gray-950"
        style="font-size: clamp(2.75rem, 7.5vw, 7.5rem)"
      >
        {{ caseData.title }}
      </h2>

      <p data-trail-block class="max-w-2xl font-serif text-xl italic leading-snug text-gray-800 md:text-2xl">
        {{ caseData.result }}
      </p>

      <div data-trail-block class="mt-2 flex flex-wrap items-center justify-center gap-6">
        <a
          :href="ctaHref"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 rounded-full border border-gray-950/30 px-6 py-3 font-mono-code text-xs uppercase tracking-widest text-gray-950 transition-colors hover:border-gray-950 hover:bg-gray-950 hover:text-offwhite-100"
          data-cursor-hover="falar"
        >
          Quero algo assim
          <Icon name="lucide:arrow-up-right" class="size-4" />
        </a>
        <a
          v-if="caseData.url"
          :href="caseData.url"
          target="_blank"
          rel="noopener"
          class="font-mono-code text-xs uppercase tracking-widest text-gray-600 underline-offset-4 transition-colors hover:text-gray-950 hover:underline"
        >
          ver no ar →
        </a>
      </div>

      <!-- Sem hover no touch: prints em crossfade só no mobile. -->
      <div
        data-trail-block
        class="relative mt-6 block aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-black/10 shadow-xl shadow-black/20 lg:hidden"
      >
        <img
          v-for="(img, i) in caseData.images"
          :key="img"
          :src="img"
          :alt="`${caseData.title} — tela ${i + 1}`"
          class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          :class="i === frame ? 'opacity-100' : 'opacity-0'"
          loading="eager"
          draggable="false"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  caseData: { type: Object, required: true },
  index: { type: Number, required: true },
  isActive: { type: Boolean, default: false },
  ctaHref: { type: String, required: true },
});

const frame = ref(0);
let timer = null;

// Crossfade do painel mobile — só no card visível, e só no client (SSR não tem setInterval).
function syncTimer(active) {
  if (timer) clearInterval(timer);
  timer = null;
  if (active && props.caseData.images.length > 1) {
    timer = setInterval(() => {
      frame.value = (frame.value + 1) % props.caseData.images.length;
    }, 2800);
  }
}

onMounted(() => {
  watch(() => props.isActive, syncTimer, { immediate: true });
});

onUnmounted(() => timer && clearInterval(timer));
</script>

<style scoped>
.freelaa-blob {
  position: absolute;
  border-radius: 9999px;
  filter: blur(70px);
  will-change: transform;
}
.freelaa-blob--a {
  width: 46vw;
  height: 46vw;
  top: 2%;
  left: -10%;
  opacity: 0.55;
  background: radial-gradient(circle, var(--case-color) 0%, transparent 65%);
  animation: freelaa-wander-a 9s ease-in-out infinite;
}
.freelaa-blob--b {
  width: 40vw;
  height: 40vw;
  right: -8%;
  bottom: -12%;
  opacity: 0.5;
  background: radial-gradient(circle, var(--case-color-alt) 0%, transparent 65%);
  animation: freelaa-wander-b 13s ease-in-out infinite;
}
/* Mancha escura esfumaçada: profundidade, como no darko bratina do federicopian. */
.freelaa-blob--smoke {
  width: 34vw;
  height: 34vw;
  top: 34%;
  left: 52%;
  opacity: 0.22;
  background: radial-gradient(circle, #30323b 0%, transparent 66%);
  animation: freelaa-wander-c 16s ease-in-out infinite;
}
/* Clarão branco: mantém o miolo legível e dá o respiro pastel. */
.freelaa-blob--light {
  width: 30vw;
  height: 30vw;
  top: 18%;
  left: 32%;
  opacity: 0.85;
  background: radial-gradient(circle, #ffffff 0%, transparent 62%);
  animation: freelaa-wander-d 11s ease-in-out infinite;
}

@keyframes freelaa-wander-a {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  33% { transform: translate3d(38vw, 22vh, 0) scale(1.25); }
  66% { transform: translate3d(12vw, 48vh, 0) scale(0.85); }
}
@keyframes freelaa-wander-b {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  30% { transform: translate3d(-34vw, -26vh, 0) scale(0.8); }
  65% { transform: translate3d(-10vw, -46vh, 0) scale(1.3); }
}
@keyframes freelaa-wander-c {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  40% { transform: translate3d(-26vw, -18vh, 0) scale(1.2); }
  70% { transform: translate3d(10vw, 14vh, 0) scale(0.9); }
}
@keyframes freelaa-wander-d {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  35% { transform: translate3d(16vw, 20vh, 0) scale(1.35); }
  70% { transform: translate3d(-14vw, 6vh, 0) scale(0.9); }
}
@media (prefers-reduced-motion: reduce) {
  .freelaa-blob { animation: none; }
}
</style>
