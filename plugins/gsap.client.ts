import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger, SplitText);

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Estados iniciais ocultos das animações só se aplicam sob html.js-anim:
  // sem JS ou com reduced-motion a página fica visível desde o primeiro paint.
  if (!prefersReducedMotion) {
    document.documentElement.classList.add("js-anim");
  }

  ScrollTrigger.config({ ignoreMobileResize: true });

  return {
    provide: {
      gsap,
      ScrollTrigger,
      SplitText,
      prefersReducedMotion,
    },
  };
});
