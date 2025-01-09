<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Comment; 
use App\Models\Reaction;


class PostController extends Controller
{
    public function addComment(Request $request, $post, $user)
{
    // Validation des données reçues
    $validated = $request->validate([
        'content' => 'required|string|max:255',
    ]);

    // Ajouter un commentaire
    $comment = Comment::create([
        'post_id' => $post,
        'user_id' => $user,
        'content' => $validated['content'],
    ]);

    return response()->json(['message' => 'Comment added successfully', 'data' => $comment], 201);
}

public function addReaction(Request $request, $post, $user)
{
    // Validation des données reçues
    $validated = $request->validate([
        'type' => 'required|string',
    ]);

    // Ajouter une réaction
    $reaction = Reaction::create([
        'post_id' => $post,
        'user_id' => $user,
        'type' => $validated['type'],
    ]);

    return response()->json(['message' => 'Reaction added successfully', 'data' => $reaction], 201);
}



public function createPost(Request $request, $user)
{
    // Validation des données reçues
    $validated = $request->validate([
        'content' => 'required|string|max:500',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Gestion de l'image (si elle existe)
    $imagePath = null;
    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('posts', 'public');
    }

    // Création du post
    $post = Post::create([
        'user_id' => $user,
        'content' => $validated['content'],
        'image' => $imagePath,
    ]);

    return response()->json(['message' => 'Post created successfully', 'data' => $post], 201);
}


}
