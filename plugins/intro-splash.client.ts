export default defineNuxtPlugin(() => {
  const { showSplash, initSplash } = useIntroSplash();

  showSplash.value = true;
  document.documentElement.classList.add("splash-active");
  initSplash();
});
