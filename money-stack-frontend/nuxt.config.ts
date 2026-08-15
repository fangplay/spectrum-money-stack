// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@artmizu/nuxt-prometheus',
    '@morev/vue-transitions',
    '@mojocss/nuxt',
    '@maz-ui/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/ionic',
    '@vue-api/nuxt',
    'dayjs-nuxt',
    'nuxt-api-party',
    'nuxt-google-auth',
    'nuxt-icon-tw',
    'nuxt-icons',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
})