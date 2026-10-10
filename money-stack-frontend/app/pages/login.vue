<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

import { useAuth } from '../../../composables/useAuth'
import { useApi } from '../../../composables/useApi'

const { api } = useApi()
const { login } = useAuth()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''

  if (!email.value.trim() || !password.value) {
    errorMessage.value = 'Please enter your email and password.'
    return
  }

  isLoading.value = true

  try {
    const response = await api<{
      token?: string
      access_token?: string
      user?: {
        id: number
        name: string
        email: string
      }
    }>('/login', {
      method: 'POST',
      body: {
        email: email.value.trim(),
        password: password.value,
      },
    })

    const accessToken = response.token ?? response.access_token

    if (!accessToken) {
      throw new Error('The API did not return an authentication token.')
    }

    login(accessToken)

    // await navigateTo('/')
    // await navigateTo('/money-plans')
    await navigateTo('/dashboard')
  } catch (error: any) {
    errorMessage.value =
      error?.data?.message ||
      error?.message ||
      'Login failed. Please check your credentials and try again.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="login-page">
    <section class="login-card">
      <div class="logo">💰</div>

      <h1>Welcome back</h1>
      <p class="subtitle">
        Sign in to manage your money plans.
      </p>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            required
          />
        </div>

        <p v-if="errorMessage" class="error-message" role="alert">
          {{ errorMessage }}
        </p>

        <button type="submit" class="login-button" :disabled="isLoading">
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <p class="register-link">
        Don't have an account?
        <NuxtLink to="/register">Create an account</NuxtLink>
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: calc(100vh - 75px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background: var(--bg);
  color: var(--text);
}

.login-card {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 6%);
}

.logo {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 12px;
}

h1 {
  text-align: center;
  font-size: 1.8rem;
  margin: 0 0 8px;
}

.subtitle {
  color: var(--muted);
  text-align: center;
  margin-bottom: 28px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}

label {
  font-weight: 600;
}

input {
  width: 100%;
  padding: 12px;
  background: var(--input-bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  font: inherit;
}

input:focus {
  outline: 2px solid var(--primary);
  outline-offset: 1px;
}

.login-button {
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.login-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  padding: 12px;
  background: #fee2e2;
  color: #991b1b;
  border-radius: 8px;
  font-size: 0.9rem;
}

.register-link {
  margin-top: 24px;
  text-align: center;
  color: var(--muted);
}

.register-link a {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

@media (max-width: 480px) {
  .login-card {
    padding: 24px 18px;
  }
}
</style>