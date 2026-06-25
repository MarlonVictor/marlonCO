import type Lenis from "lenis";

export function useSmoothScroll() {
  const nuxtApp = useNuxtApp();
  const { isComplete } = useIntroSplash();

  const lenis = computed(() => nuxtApp.$lenis as Lenis | null | undefined);

  function pause() {
    lenis.value?.stop();
  }

  function resume() {
    if (isComplete.value) {
      lenis.value?.start();
    }
  }

  function scrollTo(
    target: Parameters<Lenis["scrollTo"]>[0],
    options?: Parameters<Lenis["scrollTo"]>[1],
  ) {
    lenis.value?.scrollTo(target, options);
  }

  return {
    lenis,
    pause,
    resume,
    scrollTo,
  };
}
