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
    },
  },

  css: ["~/assets/css/main.css"],
});
