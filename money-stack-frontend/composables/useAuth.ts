interface User {
  id: number
  name: string
  email: string
}

interface AuthResponse {
  user: User
  token?: string
  message?: string
}

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface LoginData {
  email: string
  password: string
}

export const useAuth = () => {
  const api = useApi()

  const user = useState<User | null>('auth-user', () => null)
  const token = useCookie<string | null>('auth-token', {
    default: () => null,
    sameSite: 'lax'
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const register = async (data: RegisterData) => {
    loading.value = true
    error.value = null

    try {
      const response = await api<AuthResponse>('/register', {
        method: 'POST',
        body: data
      })

      user.value = response.user

      if (response.token) {
        token.value = response.token
      }

      return response
    } catch (err: any) {
      error.value =
        err?.data?.message ||
        err?.data?.errors?.email?.[0] ||
        'Registration failed.'

      throw err
    } finally {
      loading.value = false
    }
  }

  const login = async (data: LoginData) => {
    loading.value = true
    error.value = null

    try {
      const response = await api<AuthResponse>('/login', {
        method: 'POST',
        body: data
      })

      user.value = response.user

      if (response.token) {
        token.value = response.token
      }

      return response
    } catch (err: any) {
      error.value =
        err?.data?.message ||
        'Invalid email or password.'

      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
  }

  return {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout
  }
}