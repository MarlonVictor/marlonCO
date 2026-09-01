import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default defineNuxtPlugin((nuxtApp) => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { provide: { lenis: null } };
  }

  // Provido por plugins/gsap.client.ts (roda antes por ordem alfabética).
  const $gsap = nuxtApp.$gsap as typeof import("gsap").gsap | undefined;
  const $ScrollTrigger = nuxtApp.$ScrollTrigger as
    | typeof import("gsap/ScrollTrigger").ScrollTrigger
    | undefined;

  const lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.1,
    smoothWheel: true,
    // Um ticker só (gsap) evita double-RAF e jitter em scrub/pin;
    // autoRaf fica como fallback caso o plugin do gsap seja removido.
    autoRaf: !$gsap,
    anchors: {
      offset: 80,
    },
  });

  if ($gsap && $ScrollTrigger) {
    lenis.on("scroll", $ScrollTrigger.update);
    $gsap.ticker.add((time) => lenis.raf(time * 1000));
    $gsap.ticker.lagSmoothing(0);
  }

  lenis.stop();

  const { isComplete } = useIntroSplash();

  watch(
    isComplete,
    (complete) => {
      if (complete) lenis.start();
      else lenis.stop();
    },
    { immediate: true },
  );

  return {
    provide: {
      lenis,
    },
  };
});
