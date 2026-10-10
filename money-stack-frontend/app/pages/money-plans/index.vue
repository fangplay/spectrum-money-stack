<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

const {
  plans,
  loading,
  error,
  fetchPlans,
  deletePlan
} = useMoneyPlans()

const search = ref('')
const deletingId = ref<number | null>(null)
const actionError = ref('')

onMounted(() => {
  fetchPlans().catch(() => {})
})

const filteredPlans = computed(() => {
  const query = search.value.toLowerCase().trim()

  return plans.value.filter(plan =>
    plan.name.toLowerCase().includes(query) ||
    (plan.description ?? '').toLowerCase().includes(query)
  )
})

async function removePlan(id: number, name: string) {
  if (!confirm(`Delete "${name}"? This cannot be undone.`)) {
    return
  }

  deletingId.value = id
  actionError.value = ''

  try {
    await deletePlan(id)
  } catch (err: any) {
    actionError.value =
      err?.data?.message ?? 'Could not delete the plan.'
  } finally {
    deletingId.value = null
  }
}

const money = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
</script>

<template>
  <section class="page">
    <header class="heading">
      <div>
        <h1>Money Plans</h1>
        <p>Manage your financial goals and planned amounts.</p>
      </div>

      <NuxtLink to="/money-plans/create" class="primary">
        + Create plan
      </NuxtLink>
    </header>

    <section class="panel">
      <input
        v-model="search"
        class="search"
        type="search"
        placeholder="Search plans..."
        aria-label="Search money plans"
      />

      <p v-if="error || actionError" class="error">
        {{ actionError || error }}
      </p>

      <div v-if="loading" class="empty">
        Loading plans...
      </div>

      <div
        v-else-if="!filteredPlans.length"
        class="empty"
      >
        <p>
          {{ search ? 'No matching plans.' : 'No money plans yet.' }}
        </p>
        <NuxtLink v-if="!search" to="/money-plans/create">
          Create your first plan
        </NuxtLink>
      </div>

      <div v-else class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Plan name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="plan in filteredPlans" :key="plan.id">
              <td class="plan-name">{{ plan.name }}</td>
              <td>{{ plan.description || '—' }}</td>
              <td class="amount">
                {{ money(Number(plan.amount)) }}
              </td>
              <td>
                <div class="actions">
                  <NuxtLink :to="`/money-plans/${plan.id}`">
                    Edit
                  </NuxtLink>

                  <button
                    class="delete"
                    :disabled="deletingId === plan.id"
                    @click="removePlan(plan.id, plan.name)"
                  >
                    {{ deletingId === plan.id
                      ? 'Deleting...'
                      : 'Delete' }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>

<style scoped>
.page {
  display: grid;
  gap: 24px;
}

.heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

h1 {
  margin: 0 0 8px;
  font-size: 28px;
}

.heading p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.panel {
  padding: 22px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 14px;
}

.primary {
  padding: 11px 15px;
  border-radius: 9px;
  background: var(--accent);
  color: white;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}

.search {
  width: 100%;
  max-width: 380px;
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: var(--page-bg);
  color: var(--text);
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 13px;
}

th, td {
  padding: 15px 12px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

th {
  color: var(--muted);
  font-size: 11px;
}

.plan-name, .amount {
  font-weight: 700;
}

.actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.actions a {
  color: var(--accent);
  font-weight: 700;
}

.delete {
  border: 0;
  background: transparent;
  color: #dc4545;
}

.delete:disabled {
  opacity: 0.5;
}

.empty {
  padding: 35px 10px;
  text-align: center;
  color: var(--muted);
}

.empty a {
  color: var(--accent);
}

.error {
  color: #dc4545;
}

@media (max-width: 560px) {
  .heading {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
