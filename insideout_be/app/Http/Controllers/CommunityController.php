<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CommunityController extends Controller
{
    public function getFriendsDetails($userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        $friends = User::join('friendships', function ($join) use ($userId) {
                $join->on('users.id', '=', 'friendships.friend_id')
                    ->where('friendships.user_id', '=', $userId)
                    ->where('friendships.status', '=', 'accepted');
            })
            ->select('users.id as user_id', 'users.nom', 'users.prenom')
            ->orderBy('users.id')
            ->get();
    
        return response()->json(['data' => $friends], 200);
    }
    

}
