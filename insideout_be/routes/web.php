<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/hello', function () {
        return response()->json(['message' => 'Hello from Laravel!']);
    });
});
// Inscription
Route::post('register', [AuthController::class, 'register']);

// Connexion
Route::post('login', [AuthController::class, 'login']);

// Déconnexion
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Route protégée
Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);
