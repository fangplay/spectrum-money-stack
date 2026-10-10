<script setup lang="ts">
const colorMode = useColorMode()

import { useAuth } from '../../composables/useAuth'

const { isLoggedIn, logout } = useAuth()

const themeOptions = [
  { label: 'System', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
]
</script>

<template>
  <div class="app-shell">
    <header class="navbar">
      <NuxtLink to="/" class="brand">
        Money Stack
      </NuxtLink>

      <nav>
        <template v-if="isLoggedIn">
          <NuxtLink to="/">Dashboard</NuxtLink>
          <NuxtLink to="/money-plans">Money Plans</NuxtLink>
          <NuxtLink to="/money-plans/create">Create Plan</NuxtLink>
          <button class="logout-btn" @click="logout">
            Logout
          </button>
        </template>

        <template v-else>
          <!-- <NuxtLink to="/">Home</NuxtLink> -->
          <NuxtLink to="/login">Login</NuxtLink>
          <NuxtLink to="/register">Register</NuxtLink>
        </template>

        <label class="theme-picker">
        <span>Theme</span>
        <select v-model="colorMode.preference">
          <option
            v-for="option in themeOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </label>
      </nav>
      
    </header>

    <main class="page-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  padding: 16px 28px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
}

.brand {
  font-size: 1.35rem;
  font-weight: 700;
  text-decoration: none;
}

nav {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

nav a {
  text-decoration: none;
}

.theme-picker {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
}

.theme-picker select {
  background: var(--input-bg);
  color: var(--text);
  border: 1px solid var(--border);
  padding: 8px;
  border-radius: 6px;
}

.logout-btn {
  padding: 8px 12px;
  color: white;
  background: #dc2626;
  border: none;
  border-radius: 6px;
}

.page-content {
  min-height: calc(100vh - 75px);
}

@media (max-width: 600px) {
  .navbar {
    padding: 16px;
  }

  nav {
    width: 100%;
  }
}
</style>