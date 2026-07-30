<template>
  <div
    ref="rootRef"
    class="pointer-events-none absolute inset-0 overflow-hidden bg-[#09090b]"
    :class="{ 'aura-background--paused': !isActive }"
  >
    <!-- UnicornStudio animated background -->
    <div class="absolute inset-0 brightness-75">
      <div
        data-us-project="uFY4IYPs2LU8fWm96Im2"
        class="absolute inset-0"
      />
    </div>

    <!-- Glow / light effects (CSS only, no heavy blur) -->
    <div
      class="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute top-0 left-1/2 h-[60vh] w-px -translate-x-1/2 bg-gradient-to-b from-zinc-400/30 via-zinc-500/5 to-transparent"
      />
      <div
        class="absolute top-[10%] left-1/2 h-56 w-48 -translate-x-1/2 rounded-full bg-zinc-400/10 blur-3xl"
      />
      <div
        class="absolute -top-[50vh] h-[100vh] w-[150vw] rounded-[100%] border border-zinc-500/10"
      />
      <div
        class="absolute top-[20vh] h-[120vh] w-[120vw] rounded-[100%] border border-zinc-600/5"
      />
    </div>

    <!-- Fade into page background -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#09090b]"
    />
  </div>
</template>

<script setup>
const rootRef = ref(null);
const isActive = ref(true);
let observer = null;

const initUnicornStudio = () => {
  if (typeof window === "undefined" || !window.UnicornStudio) return;

  window.UnicornStudio.init();
  window.UnicornStudio.isInitialized = true;
};

const loadUnicornStudio = () => {
  if (typeof window === "undefined") return;

  const runInit = () => nextTick(initUnicornStudio);

  if (window.UnicornStudio?.isInitialized) {
    runInit();
    return;
  }

  const existingScript = document.querySelector("script[data-unicorn-studio]");
  if (existingScript) {
    if (window.UnicornStudio) {
      runInit();
    } else {
      existingScript.addEventListener("load", runInit, { once: true });
    }
    return;
  }

  window.UnicornStudio = { isInitialized: false };
  const script = document.createElement("script");
  script.dataset.unicornStudio = "";
  script.src =
    "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
  script.onload = runInit;
  document.head.appendChild(script);
};

onMounted(() => {
  nextTick(loadUnicornStudio);

  if (typeof window === "undefined" || !rootRef.value) return;

  const heroSection = rootRef.value.parentElement;
  if (!heroSection) return;

  observer = new IntersectionObserver(
    ([entry]) => {
      isActive.value = entry.isIntersecting;
    },
    { threshold: 0, rootMargin: "0px 0px -20% 0px" },
  );
  observer.observe(heroSection);
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.aura-background--paused {
  visibility: hidden;
}
</style>
