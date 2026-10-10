<script setup lang="ts">
const { login, loading, error } = useAuth()

const form = reactive({
  email: '',
  password: ''
})

const submit = async () => {
  try {
    await login(form)

    await navigateTo('/')
  } catch {
    // Error is handled by useAuth()
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <div class="auth-header">
        <h1>Welcome back</h1>
        <p>Sign in to your Money Stack account.</p>
      </div>

      <form @submit.prevent="submit" class="auth-form">
        <div class="form-group">
          <label for="email">Email</label>

          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            required
            autocomplete="email"
          />
        </div>

        <div class="form-group">
          <label for="password">Password</label>

          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            required
            autocomplete="current-password"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <div class="auth-footer">
        <span>Don't have an account?</span>

        <NuxtLink to="/register">
          Create account
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--page-bg);
}

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 32px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: var(--card-bg);
  color: var(--text-color);
  box-shadow: 0 10px 30px var(--shadow-color);
}

.auth-header {
  margin-bottom: 28px;
  text-align: center;
}

.auth-header h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.auth-header p {
  margin: 0;
  color: var(--muted-text);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid var(--input-border);
  border-radius: 8px;
  outline: none;
  background: var(--input-bg);
  color: var(--text-color);
}

.form-group input:focus {
  border-color: #6366f1;
}

button {
  padding: 13px;
  border: 0;
  border-radius: 8px;
  background: #6366f1;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  padding: 12px;
  border-radius: 8px;
  background: var(--error-bg);
  color: var(--error-text);
  font-size: 14px;
}

.auth-footer {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 24px;
  font-size: 14px;
}

.auth-footer a {
  color: #6366f1;
  font-weight: 600;
}

:global(:root) {
  --page-bg: #f8fafc;
  --card-bg: #ffffff;
  --text-color: #111827;
  --muted-text: #6b7280;
  --border-color: #e5e7eb;
  --input-border: #d1d5db;
  --input-bg: #ffffff;
  --shadow-color: rgba(0, 0, 0, 0.08);
  --error-bg: #fef2f2;
  --error-text: #b91c1c;
}

:global(.dark) {
  --page-bg: #0f172a;
  --card-bg: #1e293b;
  --text-color: #f8fafc;
  --muted-text: #94a3b8;
  --border-color: #334155;
  --input-border: #475569;
  --input-bg: #0f172a;
  --shadow-color: rgba(0, 0, 0, 0.3);
  --error-bg: #450a0a;
  --error-text: #fca5a5;
}
</style>