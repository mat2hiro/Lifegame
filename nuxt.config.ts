import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  target: "static",
  head: {
    title: "LifeGame",
  },
  modules: ["@nuxtjs/tailwindcss"],
  css: ["@/assets/main.scss"],
  plugins: ["@/plugins/fontawesome.ts"],
});
