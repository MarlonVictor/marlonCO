import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default defineNuxtPlugin(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return { provide: { lenis: null } };
  }

  const lenis = new Lenis({
    lerp: 0.08,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.1,
    smoothWheel: true,
    autoRaf: true,
    anchors: {
      offset: 80,
    },
  });

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
