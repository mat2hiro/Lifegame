import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: "static",
  css: ["@/assets/css/main.scss", "@/assets/css/tailwind.css"],
  plugins: ["@/plugins/fontawesome.ts"],
  modules: ["@nuxtjs/tailwindcss"],
});
