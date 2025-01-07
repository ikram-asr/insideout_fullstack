<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();  // Vous pouvez ajouter des filtres ou des relations si nécessaire
        return response()->json($users);  // Retourner les utilisateurs sous forme de JSON
    }
 /*   public function getUser($id)
    {
        $user = User::find($id); // Récupérer l'utilisateur par son ID
    
        if (!$user) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
    
        return response()->json($user);
    }*/
    public function getUser($id)
{
    // Récupérer l'utilisateur avec ses relations
    $user = User::with([
        'posts',
        'comments',
        'sentMessages',
        'receivedMessages',
        'friendships',
        'friends',
        'etats',
        'reactions'
    ])->find($id);

    // Vérifier si l'utilisateur existe
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    // Retourner les données de l'utilisateur avec ses relations
    return response()->json($user);
}

    
}
