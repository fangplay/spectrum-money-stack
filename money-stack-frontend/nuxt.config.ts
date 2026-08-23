// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-23',

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

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  devtools: {
    enabled: true
  }
})