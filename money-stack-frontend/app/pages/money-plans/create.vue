
<script setup lang="ts">
import type { MoneyPlanForm } from '~/types/money-plan'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { createPlan } = useMoneyPlans()

const form = reactive<MoneyPlanForm>({
  name: '',
  amount: 0,
  description: ''
})

const loading = ref(false)
const error = ref('')
const validationErrors = ref<Record<string, string[]>>({})

async function submit() {
  loading.value = true
  error.value = ''
  validationErrors.value = {}

  try {
    const plan = await createPlan({ ...form })
    await navigateTo(`/money-plans/${plan.id}`)
  } catch (err: any) {
    error.value = err?.data?.message ?? 'Could not create plan.'
    validationErrors.value = err?.data?.errors ?? {}
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="page">
    <NuxtLink to="/money-plans" class="back">
      ← Back to money plans
    </NuxtLink>

    <div class="form-card">
      <h1>Create money plan</h1>
      <p class="subtitle">
        Set up a new financial goal.
      </p>

      <form @submit.prevent="submit">
        <label for="name">Plan name</label>
        <input
          id="name"
          v-model="form.name"
          required
          maxlength="255"
          placeholder="e.g. Emergency fund"
        />
        <small v-if="validationErrors.name" class="error">
          {{ validationErrors.name[0] }}
        </small>

        <label for="amount">Target amount</label>
        <input
          id="amount"
          v-model.number="form.amount"
          type="number"
          min="0.01"
          step="0.01"
          required
          placeholder="1000.00"
        />
        <small v-if="validationErrors.amount" class="error">
          {{ validationErrors.amount[0] }}
        </small>

        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
          placeholder="Describe your financial goal..."
        />

        <p v-if="error" class="error">{{ error }}</p>

        <div class="buttons">
          <NuxtLink to="/money-plans" class="secondary">
            Cancel
          </NuxtLink>

          <button class="primary" type="submit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Create plan' }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: auto;
}

.back {
  display: inline-block;
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 14px;
}

.form-card {
  padding: 28px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}

h1 {
  margin: 0 0 8px;
  font-size: 26px;
}

.subtitle {
  margin: 0 0 28px;
  color: var(--muted);
  font-size: 14px;
}

form {
  display: grid;
  gap: 10px;
}

label {
  margin-top: 10px;
  font-size: 13px;
  font-weight: 700;
}

input, textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--page-bg);
  color: var(--text);
}

textarea {
  resize: vertical;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}

.primary, .secondary {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 11px 16px;
  border: 0;
  border-radius: 9px;
  font-size: 13px;
  font-weight: 700;
}

.primary {
  background: var(--accent);
  color: white;
}

.primary:disabled {
  opacity: 0.6;
}

.secondary {
  border: 1px solid var(--border);
  color: var(--text);
}

.error {
  color: #dc4545;
  font-size: 13px;
}
</style>
