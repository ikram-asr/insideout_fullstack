<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message; // Modèle pour gérer les messages
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function getConversation($userId, $friendId)
    {
        // Récupérer les messages échangés entre deux utilisateurs
        $conversation = Message::where(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $userId)
                  ->where('receiver_id', $friendId);
        })->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $friendId)
                  ->where('receiver_id', $userId);
        })->orderBy('created_at', 'asc') // Trier par date de création (ascendant)
          ->get();
    
        // Vérifier si une conversation existe
        if ($conversation->isEmpty()) {
            return response()->json(['message' => 'Aucune conversation trouvée'], 404);
        }
    
        // Retourner la conversation
        return response()->json($conversation);
    }

     // Nouvelle méthode pour envoyer un message
     // Fonction pour envoyer un message
     public function sendMessage(Request $request)
     {
         // Valider les données reçues
         $validated = $request->validate([
             'sender_id' => 'required|exists:users,id', // L'ID de l'utilisateur doit exister dans la table users
             'receiver_id' => 'required|exists:users,id', // L'ID de l'ami doit exister dans la table users
             'content' => 'required|string|max:255', // Le contenu du message
         ]);
 
         // Créer un nouveau message
         $message = Message::create([
             'sender_id' => $validated['sender_id'],
             'receiver_id' => $validated['receiver_id'],
             'content' => $validated['content'],
         ]);
 
         // Retourner une réponse avec le message créé
         return response()->json([
             'message' => 'Message envoyé avec succès',
             'data' => $message
         ], 201);
     }
    
}
