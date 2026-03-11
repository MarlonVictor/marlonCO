import dataPt from "../assets/data/portfolio-pt.json";
import dataEn from "../assets/data/portfolio-en.json";
import { computed, ref } from "vue";
import { useRequestURL } from "nuxt/app";

const currentLang = ref("pt-BR");
let langInitialized = false;

export const useLocale = () => {
  // Detecta idioma da URL no servidor e cliente
  if (!langInitialized) {
    const url = useRequestURL();
    const lang = url.searchParams.get("lang");
    if (lang === "en") {
      currentLang.value = "en";
    }
    langInitialized = true;
  }

  const data = computed(() => {
    return currentLang.value === "en" ? dataEn : dataPt;
  });

  const switchLanguage = (lang: string) => {
    if (import.meta.server) return;

    const url = new URL(window.location.href);

    if (lang === "en") {
      url.searchParams.set("lang", "en");
      currentLang.value = "en";
    } else {
      url.searchParams.delete("lang");
      currentLang.value = "pt-BR";
    }

    window.history.pushState({}, "", url.toString());
  };

  return {
    data,
    currentLang,
    switchLanguage,
  };
};
