
import { ref } from 'vue'
import { useState } from 'nuxt/app'
import { useApi } from './useApi'
import type {
  MoneyPlan,
  MoneyPlanForm
} from '../types/money-plan'

export const useMoneyPlans = () => {
  const api = useApi()

  const plans = useState<MoneyPlan[]>(
    'money-plans',
    () => []
  )

  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPlans() {
    loading.value = true
    error.value = null

    try {
      const response = await api<MoneyPlan[]>(
        '/money-plans'
      )

      plans.value = response
      return response
    } catch (err: any) {
      error.value =
        err?.data?.message ?? 'Could not load money plans.'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPlan(id: number) {
    return await api<MoneyPlan>(`/money-plans/${id}`)
  }

  async function createPlan(data: MoneyPlanForm) {
    const plan = await api<MoneyPlan>('/money-plans', {
      method: 'POST',
      body: data
    })

    plans.value = [...plans.value, plan]
    return plan
  }

  async function updatePlan(
    id: number,
    data: MoneyPlanForm
  ) {
    const plan = await api<MoneyPlan>(`/money-plans/${id}`, {
      method: 'PUT',
      body: data
    })

    plans.value = plans.value.map(item =>
      item.id === id ? plan : item
    )

    return plan
  }

  async function deletePlan(id: number) {
    await api(`/money-plans/${id}`, {
      method: 'DELETE'
    })

    plans.value = plans.value.filter(
      item => item.id !== id
    )
  }

  return {
    plans,
    loading,
    error,
    fetchPlans,
    fetchPlan,
    createPlan,
    updatePlan,
    deletePlan
  }
}
