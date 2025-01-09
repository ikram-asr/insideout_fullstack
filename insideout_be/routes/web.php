<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\CommunityController;

use App\Http\Controllers\EtatController;

use App\Http\Controllers\PostController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\FriendshipController;

Route::get('/hello', function () {
    return response()->json(['message' => 'Hello, world!']);
});

Route::get('/', function () {
    return view('welcome');
});
Route::middleware('auth:sanctum')->get('friends/details', [CommunityController::class, 'getFriendsDetails']);

/*Route::prefix('api')->group(function () {
    Route::post('signup', [AuthentificationController::class, 'signup']);
    Route::post('login', [AuthentificationController::class, 'login']);
   
});*/


Route::prefix('api')->group(function () {
    Route::get('/hello', function () {
        return response()->json(['message' => 'Hello from Laravel!']);
    });
});

// Inscription

Route::prefix('api')->group(function () {
    Route::post('etat', [EtatController::class, 'saveEtat']);
    Route::get('listusers', [UserController::class, 'getAllUsers']);
    Route::post('signup', [AuthController::class, 'signup']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('users/user/{id}', [UserController::class, 'getUser']);


    Route::middleware('auth:sanctum')->get('/posts', [PostController::class, 'index']);

    Route::middleware([])->group(function () {
    Route::post('/posts/{post}/users/{user}/comments', [PostController::class, 'addComment']);
    Route::post('/posts/{post}/users/{user}/reactions', [PostController::class, 'addReaction']);
    Route::post('/users/{user}/posts', [PostController::class, 'createPost']);
});



    Route::get('/users/conversations/{userId}/{friendId}', [ConversationController::class, 'getConversation']);
    Route::post('/users/send-message', [ConversationController::class, 'sendMessage']);
    Route::post('/users/friendships', [FriendshipController::class, 'store']);

    
   

    

    //Route::middleware('auth:sanctum')->get('users/user/{id}', [UserController::class, 'getUser']);
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
    Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);
})->middleware('auth:sanctum');
/*Route::post('register', [AuthController::class, 'register']);

// Connexion
Route::post('login', [AuthController::class, 'login']);

// Déconnexion
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Route protégée
Route::middleware('auth:sanctum')->get('user', [AuthController::class, 'getUser']);*/