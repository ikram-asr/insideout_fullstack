<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\AuthentificationController;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello, world!']);
});

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::post('signup', [AuthentificationController::class, 'signup']);
    Route::post('login', [AuthentificationController::class, 'login']);
   
});


Route::prefix('api')->group(function () {
    Route::get('/hello', function () {
        return response()->json(['message' => 'Hello from Laravel!']);
    });
});

/*// Inscription

Route::prefix('api')->group(function () {
    Route::post('signup', [AuthentificationController::class, 'signup']);
    Route::post('login', [AuthentificationController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
    Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);
})->middleware('auth:sanctum');
Route::post('register', [AuthController::class, 'register']);

// Connexion
Route::post('login', [AuthController::class, 'login']);

// Déconnexion
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Route protégée
Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);*/
