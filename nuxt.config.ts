// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  // SSR habilitado por padrão
  ssr: true,

  modules: ["@nuxtjs/tailwindcss", "@nuxt/icon"],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "мᴀʀʟᴏɴ.ᴄᴏ - Software Developer",
      meta: [
        {
          name: "description",
          content: "Portfólio profissional",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "/favicon.ico",
        },
        // Preconnect para carregamento mais rápido das fontes em produção
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        // Fontes carregadas no head para garantir que mono carregue em produção (evita falha de @import no CSS)
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&family=Monomaniac+One&display=swap",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css"],
});
