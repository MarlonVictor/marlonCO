type SectionContext = {
  gsap: any;
  ScrollTrigger: any;
  /** Divide em linhas mascaradas (fontes já carregadas nesse ponto). */
  splitLines: (target: Element | Element[] | string, vars?: object) => any;
};

/**
 * Padrão da casa para animações GSAP em sections:
 * - aguarda document.fonts.ready (métrica de linha correta pro SplitText);
 * - roda o callback síncrono dentro de um gsap.context escopado ao elemento,
 *   para que TUDO (ScrollTriggers, SplitText, tweens) seja revertido no unmount;
 * - com prefers-reduced-motion o callback não roda e a section ganha
 *   `.is-revealed` para estados iniciais ocultos via CSS ficarem visíveis.
 */
export function useGsapSection(
  scope: Ref<HTMLElement | null>,
  setup: (ctx: SectionContext) => void,
) {
  const nuxtApp = useNuxtApp();
  const reduced = computed(() =>
    import.meta.server ? false : Boolean(nuxtApp.$prefersReducedMotion),
  );

  let ctx: any = null;
  let unmounted = false;

  onMounted(async () => {
    const el = scope.value;
    if (!el) return;

    const $gsap = nuxtApp.$gsap as any;
    const $ScrollTrigger = nuxtApp.$ScrollTrigger as any;
    const $SplitText = nuxtApp.$SplitText as any;

    if (reduced.value || !$gsap || !$ScrollTrigger || !$SplitText) {
      el.classList.add("is-revealed");
      return;
    }

    await document.fonts.ready;
    if (unmounted || !el.isConnected) return;

    // Se o setup retornar uma função, o gsap.context a usa como cleanup no revert.
    ctx = $gsap.context(() =>
      setup({
        gsap: $gsap,
        ScrollTrigger: $ScrollTrigger,
        splitLines: (target, vars = {}) =>
          new $SplitText(target, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            ...vars,
          }),
      }),
    el);
  });

  onUnmounted(() => {
    unmounted = true;
    ctx?.revert();
    ctx = null;
  });

  return { reduced };
}
