<?php

namespace App\Http\Controllers;

use App\Models\MoneyPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MoneyPlanController extends Controller
{
    /**
     * Display a listing of the user's money plans.
     */
    public function index(Request $request): JsonResponse
    {
        $moneyPlans = MoneyPlan::where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => $moneyPlans,
        ]);
    }

    /**
     * Store a newly created money plan.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'monthly_income' => ['required', 'numeric', 'min:0'],
            'monthly_expenses' => ['required', 'numeric', 'min:0'],
            'savings_target' => ['required', 'numeric', 'min:0'],
            'debt_target' => ['required', 'numeric', 'min:0'],
            'investment_target' => ['required', 'numeric', 'min:0'],
            'start_date' => ['required', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            'notes' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $moneyPlan = $request->user()
            ->moneyPlans()
            ->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Money plan created successfully.',
            'data' => $moneyPlan,
        ], 201);
    }

    /**
     * Display the specified money plan.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        $moneyPlan = MoneyPlan::where('user_id', $request->user()->id)
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $moneyPlan,
        ]);
    }

    /**
     * Update the specified money plan.
     */
    public function update(
        Request $request,
        string $id
    ): JsonResponse {
        $moneyPlan = MoneyPlan::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $validated = $request->validate([
            'name' => ['sometimes', 'string', 'max:255'],
            'monthly_income' => ['sometimes', 'numeric', 'min:0'],
            'monthly_expenses' => ['sometimes', 'numeric', 'min:0'],
            'savings_target' => ['sometimes', 'numeric', 'min:0'],
            'debt_target' => ['sometimes', 'numeric', 'min:0'],
            'investment_target' => ['sometimes', 'numeric', 'min:0'],
            'start_date' => ['sometimes', 'date'],
            'end_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $moneyPlan->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Money plan updated successfully.',
            'data' => $moneyPlan->fresh(),
        ]);
    }

    /**
     * Remove the specified money plan.
     */
    public function destroy(Request $request, string $id): JsonResponse
    {
        $moneyPlan = MoneyPlan::where('user_id', $request->user()->id)
            ->findOrFail($id);

        $moneyPlan->delete();

        return response()->json([
            'success' => true,
            'message' => 'Money plan deleted successfully.',
        ]);
    }
}