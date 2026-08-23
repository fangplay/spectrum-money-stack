<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('money_plans', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('name');

            $table->decimal('monthly_income', 15, 2)
                ->default(0);

            $table->decimal('monthly_expenses', 15, 2)
                ->default(0);

            $table->decimal('savings_target', 15, 2)
                ->default(0);

            $table->decimal('debt_target', 15, 2)
                ->default(0);

            $table->decimal('investment_target', 15, 2)
                ->default(0);

            $table->date('start_date');

            $table->date('end_date')
                ->nullable();

            $table->text('notes')
                ->nullable();

            $table->boolean('is_active')
                ->default(true);

            $table->timestamps();

            $table->index([
                'user_id',
                'is_active',
            ]);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('money_plans');
    }
};