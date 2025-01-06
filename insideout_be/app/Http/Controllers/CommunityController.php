<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class CommunityController extends Controller
{
    public function getFriendsDetails(Request $request)
    {
        $user = $request->user();

        // Récupérer les amis de l'utilisateur connecté
        $friends = User::join('friendships', function ($join) use ($user) {
                $join->on('users.id', '=', 'friendships.friend_id')
                    ->where('friendships.user_id', '=', $user->id)
                    ->where('friendships.status', '=', 'accepted');
            })
            ->leftJoin('etats', 'users.id', '=', 'etats.user_id') // Jointure avec la table etat
            ->leftJoin('posts', 'users.id', '=', 'posts.user_id') // Jointure avec la table post
            ->select(
                'users.id as user_id',
                'users.nom',
                'users.prenom',
                'etats.mood',
                'etats.sleepQuality',
                'etats.sleepHours',
                'etats.studyHours',
                'posts.id as post_id',
                'posts.content as post_content',
                'posts.created_at as post_created_at'
            )
            ->orderBy('users.id') // Optionnel: Organiser par ID
            ->get()
            ->groupBy('user_id'); // Grouper les résultats par utilisateur

        return response()->json($friends, 200);
    }
}
