<?php

use App\Http\Controllers\PresupuestoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransaccionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::resource('transaccions', TransaccionController::class);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

// Mis rutas
Route::get('/dashboard', [PresupuestoController::class, 'index'])->middleware(['auth'])->name('dashboard');
Route::post('/presupuestos', [PresupuestoController::class, 'store'])->middleware(['auth'])->name('presupuestos.store');
Route::get('/presupuestos/{id}', [PresupuestoController::class, 'show'])->middleware(['auth'])->name('presupuestos.show');
Route::post('/presupuestos/{id}/transacciones', [TransaccionController::class, 'store'])->middleware(['auth'])->name('transacciones.store');
Route::get('/grafico', [TransaccionController::class, 'grafico'])->middleware(['auth'])->name('grafico');