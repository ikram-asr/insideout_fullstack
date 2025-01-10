<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Friendship; 

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
        'reactions',
        'friends.posts',       // Posts des amis
        'friends.etats',       // États des amis
        'friends.comments',
        'friends.reactions',
    ])->find($id);

    // Vérifier si l'utilisateur existe
    if (!$user) {
        return response()->json(['message' => 'Utilisateur non trouvé'], 404);
    }

    // Retourner les données de l'utilisateur avec ses relations
    return response()->json($user);
}

  // Mettre à jour les informations utilisateur
  public function updateUser(Request $request, $id)
  {
      $user = User::find($id);
  
      if (!$user) {
          return response()->json(['success' => false, 'message' => 'Utilisateur non trouvé.'], 404);
      }
  
      //Log::info('Données reçues : ', $request->all());
  
      // Validation des données
      $validatedData = $request->validate([
          'nom' => 'required|string|max:255',
          'prenom' => 'required|string|max:255',
          'email' => 'required|email|unique:users,email,' . $id,
          'profile_image' => 'nullable|string', // Image en base64
      ]);
  
      // Gestion de l'image en base64
      if ($request->has('profile_image')) {
          $imageData = $request->input('profile_image');
          
          // Décoder l'image base64
          $image = base64_decode($imageData);
          $imageName = time() . '.png'; // Vous pouvez définir le format souhaité
          $imagePath = public_path('uploads/' . $imageName);
  
          // Sauvegarder l'image dans le dossier backend
          file_put_contents($imagePath, $image);
          $user->profile_image = $imageName;
  
          // Copier l'image dans le dossier du frontend
          $frontendPath = public_path('../../insideout_fe/public/uploads/' . $imageName);
          
          if (!copy($imagePath, $frontendPath)) {
              //Log::error('Échec de la copie de l\'image vers le frontend.');
          }
      }
  
      // Mise à jour des autres champs
      $user->update($validatedData);
  
      return response()->json([
          'success' => true,
          'message' => 'Utilisateur mis à jour avec succès.',
          'data' => $user
      ]);
  }
  

  

  

  // Supprimer un ami
  public function removeFriend($userId, $friendId)
{
    // Rechercher une relation d'amitié
    $friendship = Friendship::where('user_id', $userId)
                            ->where('friend_id', $friendId)
                            ->first();

    if (!$friendship) {
        return response()->json(['message' => 'Ami non trouvé.'], 404);
    }

    // Suppression de la relation d'amitié
    $deleted1 = Friendship::where('user_id', $userId)
                         ->where('friend_id', $friendId)
                         ->delete();
    $deleted2 = Friendship::where('user_id', $friendId)
        ->where('friend_id',  $userId)
         ->delete();

    if ($deleted1) {
        return response()->json(['message' => 'Ami supprimé avec succès.'], 200);
    } else {
        return response()->json(['message' => 'Erreur lors de la suppression de l’ami.'], 500);
    }
}



    
}
