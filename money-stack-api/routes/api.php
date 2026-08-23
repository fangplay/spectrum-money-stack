<?php

use App\Http\Controllers\MoneyPlanController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Public authentication routes
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    // User
    Route::get('/user', [UserController::class, 'show']);
    Route::put('/user', [UserController::class, 'update']);
    Route::delete('/user', [UserController::class, 'destroy']);
    Route::post('/logout', [UserController::class, 'logout']);

    // Money Plans
    Route::apiResource('money-plans', MoneyPlanController::class);
});