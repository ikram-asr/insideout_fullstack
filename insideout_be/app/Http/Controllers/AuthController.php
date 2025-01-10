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
                'password' => 'required',
            ]);
        
            // Vérifier si l'utilisateur existe
            $user = User::where('email', $request->email)->first();
        
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['success' => false, 'message' => 'Les informations d\'identification sont incorrectes.'], 401);
            }
        
            // Si tout va bien, générer un token et retourner les informations de l'utilisateur
            $token = $user->createToken('YourAppName')->plainTextToken;
        
            return response()->json([
                'success' => true,
                'message' => 'Connexion réussie.',
                'token' => $token,
                'user' => [
                    'id' => $user->id,
                    'prenom' => $user->prenom,
                    'nom' => $user->nom,
                    'email' => $user->email,
                ],
                'redirect_url' => 'http://localhost:4200/#/dashboard/' . $user->id // L'URL avec l'ID de l'utilisateur
            ]);
        }
        public function logout(Request $request)
        {
            // Vérifier si l'utilisateur est authentifié
            if ($request->user()) {
                // Révoquer le token de l'utilisateur
                $request->user()->tokens->each(function ($token) {
                    $token->delete();
                });
        
                return response()->json(['message' => 'Déconnexion réussie.']);
            }
        
            return response()->json(['message' => 'Non authentifié.'], 401);
        }
        
        
        
    }