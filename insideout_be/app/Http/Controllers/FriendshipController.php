<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Friendship; 

class FriendshipController extends Controller
{
    public function store(Request $request)
    {
        // Valider la requête entrante
        $validated = $request->validate([
            'userId' => 'required|integer',
            'friendId' => 'required|integer',
            'status' => 'required|string',
        ]);
    
        // Vérifier si les utilisateurs existent
        $user = User::find($validated['userId']);
        $friend = User::find($validated['friendId']);
    
        if (!$user || !$friend) {
            return response()->json(['error' => 'User or friend not found'], 404);
        }
    
        // Vérifier si la relation d'amitié existe déjà
        $existingFriendship = Friendship::where(function ($query) use ($validated) {
            $query->where('user_id', $validated['userId'])
                  ->where('friend_id', $validated['friendId']);
        })->orWhere(function ($query) use ($validated) {
            $query->where('user_id', $validated['friendId'])
                  ->where('friend_id', $validated['userId']);
        })->first();
    
        if ($existingFriendship) {
            return response()->json(['error' => 'Friendship already exists'], 409);
        }
    
        // Créer les relations d'amitié mutuelles
        try {
            // Insertion de la première relation
            $friendship1 = Friendship::create([
                'user_id' => $validated['userId'],
                'friend_id' => $validated['friendId'],
                'status' => $validated['status'],
            ]);
    
            // Insertion de la seconde relation (mutuelle)
            $friendship2 = Friendship::create([
                'user_id' => $validated['friendId'],
                'friend_id' => $validated['userId'],
                'status' => $validated['status'],
            ]);
    
            return response()->json(['friendship1' => $friendship1, 'friendship2' => $friendship2], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create friendship', 'details' => $e->getMessage()], 500);
        }
    }
    
    
}