<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'http://127.0.0.1:8000/api/signup',
            'http://127.0.0.1:8000/api/login',
            'http://127.0.0.1:8000/api/etat',
            'http://127.0.0.1:8000/api/posts/*/comments',
            'http://127.0.0.1:8000/api/posts/*/reactions',
            'http://127.0.0.1:8000/api/users/*/posts',
            'http://127.0.0.1:8000/api/users/send-message',
            'http://127.0.0.1:8000/api/users/friendships',
        ]);    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
