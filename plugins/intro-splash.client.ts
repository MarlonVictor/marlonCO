// Rotas que pulam o splash — páginas de conversão não podem gastar o primeiro
// segundo em animação. Precisa marcar isComplete para liberar o pointer-events
// do app.vue e dar start no Lenis.
const SKIP_SPLASH_PATHS = ["/freela", "/freela2", "/freela3", "/freela4", "/freelaa"];

export default defineNuxtPlugin(() => {
  const { showSplash, isComplete, initSplash } = useIntroSplash();

  const path = window.location.pathname;
  if (SKIP_SPLASH_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) {
    showSplash.value = false;
    isComplete.value = true;
    document.documentElement.classList.remove("splash-active");
    document.documentElement.classList.add("intro-ready");
    return;
  }

  showSplash.value = true;
  document.documentElement.classList.add("splash-active");
  initSplash();
});
