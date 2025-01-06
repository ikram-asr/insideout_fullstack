<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth; 

class AuthController extends Controller
{
        // Inscription d'un utilisateur
        public function signup(Request $request)
        {
            // Validation des données
            $validator = Validator::make($request->all(), [
                'nom' => 'required|string|max:255',
                'prenom' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
            ]);
        
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
        
            // Création de l'utilisateur
            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
        
            // Connexion de l'utilisateur après sa création
            Auth::login($user);
        
            // Retourner la réponse avec un message de succès
            return response()->json(['message' => 'Utilisateur créé et connecté avec succès!', 'user' => $user], 201);
        }
        
        // Connexion de l'utilisateur
        public function login(Request $request)
    {
        // Validation des entrées
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);

        // Vérifier si l'utilisateur existe
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Les informations d\'identification sont incorrectes.'], 401);
        }

        // Si tout va bien, générer un token et retourner les informations de l'utilisateur
        $token = $user->createToken('YourAppName')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'prenom' => $user->prenom,
                'nom' => $user->nom
            ]
        ]);
    }

    }