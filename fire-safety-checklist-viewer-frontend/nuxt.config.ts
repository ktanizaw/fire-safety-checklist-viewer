// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],

  srcDir: "src",
  ssr: false,

  devServer: {
    port: 3000,
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_ENDPOINT,
    },
  },

  css: ["@/assets/styles/global.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/variables.scss" as *;',
        },
      },
    },
  },
});
