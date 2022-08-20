import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: "static",
  head: {
    title: "LifeGame",
  },
  css: ["@/assets/css/main.scss"],
  plugins: ["@/plugins/fontawesome.ts"],
  modules: ["@nuxtjs/tailwindcss"],
});
