import { computed } from 'vue'
import { navigateTo, useCookie } from 'nuxt/app'

export const useAuth = () => {
  const token = useCookie<string | null>('auth-token', {
    default: () => null,
    sameSite: 'lax',
  })

  const isLoggedIn = computed(() => !!token.value)

  const login = (accessToken: string) => {
    token.value = accessToken
  }

  const logout = async () => {
    token.value = null
    await navigateTo('/login')
  }

  return {
    token,
    isLoggedIn,
    login,
    logout,
  }
}