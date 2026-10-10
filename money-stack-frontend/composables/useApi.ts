import { useRuntimeConfig, useCookie } from 'nuxt/app'
import { $fetch } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth-token')
  const apiBase = typeof config.public.apiBase === 'string'
    ? config.public.apiBase
    : undefined

  return $fetch.create({
    baseURL: apiBase,
    headers: {
      Accept: 'application/json'
    },
    onRequest({ options }) {
      if (token.value) {
        options.headers = new Headers(options.headers)
        options.headers.set(
          'Authorization',
          `Bearer ${token.value}`
        )
      }
    }
  })
}
