
<script setup lang="ts">
import type {
  MoneyPlan,
  MoneyPlanForm
} from '~/types/money-plan'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const route = useRoute()
const { fetchPlan, updatePlan, deletePlan } = useMoneyPlans()

const id = Number(route.params.id)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const form = reactive<MoneyPlanForm>({
  name: '',
  amount: 0,
  description: ''
})

onMounted(async () => {
  try {
    if (!Number.isSafeInteger(id) || id < 1) {
      throw new Error('Invalid money plan ID.')
    }

    const plan: MoneyPlan = await fetchPlan(id)

    form.name = plan.name
    form.amount = Number(plan.amount)
    form.description = plan.description ?? ''
  } catch (err: any) {
    error.value =
      err?.data?.message ??
      err?.message ??
      'Could not load money plan.'
  } finally {
    loading.value = false
  }
})

async function submit() {
  saving.value = true
  error.value = ''

  try {
    await updatePlan(id, { ...form })
    await navigateTo('/money-plans')
  } catch (err: any) {
    error.value =
      err?.data?.message ?? 'Could not update money plan.'
  } finally {
    saving.value = false
  }
}

async function remove() {
  if (!confirm('Delete this money plan permanently?')) return

  saving.value = true
  error.value = ''

  try {
    await deletePlan(id)
    await navigateTo('/money-plans')
  } catch (err: any) {
    error.value =
      err?.data?.message ?? 'Could not delete money plan.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <section class="page">
    <NuxtLink to="/money-plans" class="back">
      ← Back to money plans
    </NuxtLink>

    <div class="form-card">
      <h1>Edit money plan</h1>
      <p class="subtitle">Update your financial goal.</p>

      <p v-if="loading">Loading plan...</p>

      <p v-else-if="error && !form.name" class="error">
        {{ error }}
      </p>

      <form v-else @submit.prevent="submit">
        <label for="name">Plan name</label>
        <input
          id="name"
          v-model="form.name"
          required
          maxlength="255"
        />

        <label for="amount">Target amount</label>
        <input
          id="amount"
          v-model.number="form.amount"
          type="number"
          min="0.01"
          step="0.01"
          required
        />

        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          rows="4"
        />

        <p v-if="error" class="error">{{ error }}</p>

        <div class="buttons">
          <button
            type="button"
            class="danger"
            :disabled="saving"
            @click="remove"
          >
            Delete
          </button>

          <button
            type="submit"
            class="primary"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save changes' }}
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
  border: 1px solid var(--border);
  border-radius: 14px;
  background: var(--surface);
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
  gap: 12px;
}

label {
  margin-top: 8px;
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
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
}

.primary, .danger {
  padding: 11px 16px;
  border: 0;
  border-radius: 9px;
  font-weight: 700;
}

.primary {
  background: var(--accent);
  color: white;
}

.danger {
  background: #fee2e2;
  color: #b91c1c;
}

button:disabled {
  opacity: 0.6;
}

.error {
  color: #dc4545;
  font-size: 13px;
}
</style>
