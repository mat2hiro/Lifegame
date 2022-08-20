import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  target: "static",
  head: {
    title: "LifeGame",
  },
  css: ["@/assets/main.scss", "@/assets/tailwind.css"],
  plugins: ["@/plugins/fontawesome.ts"],
  nitro: {
    preset: "node",
  },
  // buildModules: ["@nuxtjs/tailwindcss"],
  build: {
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
});
