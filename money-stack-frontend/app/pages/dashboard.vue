<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'default',
})

const { isLoggedIn } = useAuth()
const { plans, fetchPlans } = useMoneyPlans()

const loading = ref(true)
const errorMessage = ref('')

const totalPlans = computed(() => plans.value.length)

const totalAmount = computed(() =>
  plans.value.reduce((total, plan) => total + Number(plan.amount || 0), 0),
)

const recentPlans = computed(() =>
  [...plans.value]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5),
)

const formatAmount = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)

onMounted(async () => {
  try {
    await fetchPlans()
  } catch {
    errorMessage.value = 'Unable to load your money plans. Please try again.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <main class="dashboard">
    <div class="page-heading">
      <div>
        <h1>Dashboard</h1>
        <p class="subtitle">Welcome to your Money Stack overview.</p>
      </div>

      <NuxtLink to="/money-plans/create" class="primary-button">
        + Create Money Plan
      </NuxtLink>
    </div>

    <p v-if="!isLoggedIn" class="error-message">
      Please log in to access your dashboard.
    </p>

    <p v-if="errorMessage" class="error-message" role="alert">
      {{ errorMessage }}
    </p>

    <section class="summary-grid">
      <article class="summary-card">
        <div class="card-icon blue">📋</div>
        <p class="card-label">Total Money Plans</p>
        <h2>{{ loading ? '...' : totalPlans }}</h2>
        <p class="card-note">Plans you've created</p>
      </article>

      <article class="summary-card">
        <div class="card-icon green">💰</div>
        <p class="card-label">Total Planned Amount</p>
        <h2>{{ loading ? '...' : formatAmount(totalAmount) }}</h2>
        <p class="card-note">Combined amount across all plans</p>
      </article>

      <article class="summary-card">
        <div class="card-icon purple">🎯</div>
        <p class="card-label">Latest Money Plan</p>
        <h2 class="latest-name">
          {{ loading ? 'Loading...' : recentPlans[0]?.name || 'No plans yet' }}
        </h2>
        <p class="card-note">Your most recently created plan</p>
      </article>
    </section>

    <section class="plans-section">
      <div class="section-heading">
        <div>
          <h2>Recent Money Plans</h2>
          <p class="subtitle">Your five most recent plans.</p>
        </div>

        <NuxtLink to="/money-plans">View all →</NuxtLink>
      </div>

      <div v-if="loading" class="empty-state">
        Loading your money plans...
      </div>

      <div v-else-if="recentPlans.length === 0" class="empty-state">
        <div class="empty-icon">💡</div>
        <h3>Start planning your money</h3>
        <p>Create your first money plan to see it here.</p>
        <NuxtLink to="/money-plans/create" class="primary-button">
          Create your first plan
        </NuxtLink>
      </div>

      <div v-else class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Plan name</th>
              <th>Description</th>
              <th class="amount-column">Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="plan in recentPlans" :key="plan.id">
              <td class="plan-name">{{ plan.name }}</td>
              <td class="description">
                {{ plan.description || 'No description' }}
              </td>
              <td class="amount-column">
                {{ formatAmount(Number(plan.amount)) }}
              </td>
              <td>
                <NuxtLink :to="`/money-plans/${plan.id}`">
                  View
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="quick-actions">
      <h2>Quick Actions</h2>

      <div class="actions-grid">
        <NuxtLink to="/money-plans/create" class="action-card">
          <span>➕</span>
          <div>
            <strong>Create a Money Plan</strong>
            <p>Set up a new financial goal.</p>
          </div>
        </NuxtLink>

        <NuxtLink to="/money-plans" class="action-card">
          <span>📊</span>
          <div>
            <strong>Manage Money Plans</strong>
            <p>View and update your plans.</p>
          </div>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  color: var(--text);
}

.page-heading,
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

h1 {
  font-size: 2rem;
  margin: 0 0 8px;
}

h2 {
  margin-top: 0;
}

.subtitle,
.card-note {
  color: var(--muted);
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin: 32px 0;
}

.summary-card,
.plans-section,
.quick-actions {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

.card-icon {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  font-size: 1.4rem;
  margin-bottom: 18px;
}

.blue {
  background: #dbeafe;
}

.green {
  background: #dcfce7;
}

.purple {
  background: #f3e8ff;
}

.card-label {
  color: var(--muted);
  margin: 0 0 8px;
}

.summary-card h2 {
  font-size: 1.8rem;
  overflow-wrap: anywhere;
  margin-bottom: 8px;
}

.latest-name {
  font-size: 1.25rem !important;
}

.card-note {
  font-size: 0.875rem;
  margin-bottom: 0;
}

.plans-section {
  margin-bottom: 28px;
}

.section-heading {
  margin-bottom: 24px;
}

.section-heading h2 {
  margin-bottom: 6px;
}

.section-heading p {
  margin-top: 0;
}

.primary-button {
  display: inline-block;
  padding: 11px 16px;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th,
td {
  padding: 15px 12px;
  border-bottom: 1px solid var(--border);
  white-space: nowrap;
}

th {
  color: var(--muted);
  font-size: 0.875rem;
}

.amount-column {
  text-align: right;
}

.plan-name {
  font-weight: 600;
}

.description {
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: var(--muted);
}

.empty-state h3 {
  color: var(--text);
}

.empty-icon {
  font-size: 2rem;
}

.empty-state .primary-button {
  margin-top: 12px;
}

.quick-actions h2 {
  margin-bottom: 20px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.action-card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 18px;
  border: 1px solid var(--border);
  border-radius: 10px;
  color: var(--text);
  text-decoration: none;
}

.action-card:hover {
  border-color: var(--primary);
}

.action-card > span {
  font-size: 1.7rem;
}

.action-card p {
  color: var(--muted);
  margin-bottom: 0;
}

.error-message {
  color: #dc2626;
  margin-top: 20px;
}

@media (max-width: 800px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .dashboard {
    padding: 24px 16px;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .summary-card,
  .plans-section,
  .quick-actions {
    padding: 18px;
  }
}
</style>