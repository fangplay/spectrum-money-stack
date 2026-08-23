<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MoneyPlan extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'monthly_income',
        'monthly_expenses',
        'savings_target',
        'debt_target',
        'investment_target',
        'start_date',
        'end_date',
        'notes',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'monthly_income' => 'decimal:2',
            'monthly_expenses' => 'decimal:2',
            'savings_target' => 'decimal:2',
            'debt_target' => 'decimal:2',
            'investment_target' => 'decimal:2',
            'start_date' => 'date',
            'end_date' => 'date',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Money plan belongs to a user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}