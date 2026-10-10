import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    ['@nuxtjs/color-mode', {
      preference: 'system',
      fallback: 'light',
      classSuffix: ''
    }]
  ],

  runtimeConfig: {
    public: {
      // apiBase: 'http://localhost:8000/api'
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },

  typescript: {
    strict: true
  }
})