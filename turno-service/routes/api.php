<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TurnoController;

Route::prefix('turnos')->group(function () {
    Route::post('/generar', [TurnoController::class, 'generar']);
    Route::post('/siguiente', [TurnoController::class, 'siguiente']);
    Route::get('/listar', [TurnoController::class, 'listar']);
});
