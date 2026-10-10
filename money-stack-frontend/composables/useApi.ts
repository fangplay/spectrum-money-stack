import { useRuntimeConfig } from 'nuxt/app'
import { $fetch } from 'ofetch'

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = typeof config.public.apiBase === 'string' ? config.public.apiBase : undefined

  const api = $fetch.create({
    baseURL: apiBase,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })

  return api
}