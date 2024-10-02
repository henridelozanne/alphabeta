// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  routeRules: {
    "/": {
      // Temporary redirect using a 307 status code
      redirect: "/home",
    },
  },
})
