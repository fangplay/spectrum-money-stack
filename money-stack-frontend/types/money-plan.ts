
export interface MoneyPlan {
  id: number
  user_id: number
  name: string
  amount: number
  description: string | null
  created_at?: string
  updated_at?: string
}

export interface MoneyPlanForm {
  name: string
  amount: number
  description: string
}
