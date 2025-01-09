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
        // Validate incoming request
        $validated = $request->validate([
            'userId' => 'required|integer',
            'friendId' => 'required|integer',
            'status' => 'required|string',
        ]);
    
        // Check if the user exists before proceeding (you can also check the friendship status if needed)
        $user = User::find($validated['userId']);
        $friend = User::find($validated['friendId']);
    
        if (!$user || !$friend) {
            return response()->json(['error' => 'User or friend not found'], 404);
        }
    
        // Check if the friendship already exists
        $existingFriendship = Friendship::where(function($query) use ($validated) {
            $query->where('user_id', $validated['userId'])
                  ->where('friend_id', $validated['friendId']);
        })->orWhere(function($query) use ($validated) {
            $query->where('user_id', $validated['friendId'])
                  ->where('friend_id', $validated['userId']);
        })->first();
    
        if ($existingFriendship) {
            return response()->json(['error' => 'Friendship already exists'], 409);
        }
    
        // Create the friendship record
        try {
            $friendship = Friendship::create([
                'user_id' => $validated['userId'],
                'friend_id' => $validated['friendId'],
                'status' => $validated['status'],
            ]);
            return response()->json($friendship, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create friendship', 'details' => $e->getMessage()], 500);
        }
    }
    
}