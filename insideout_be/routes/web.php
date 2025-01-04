<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/hello', function () {
        return response()->json(['message' => 'Hello from Laravel!']);
    });
});
