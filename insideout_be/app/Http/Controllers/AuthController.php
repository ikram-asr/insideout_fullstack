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
    
            // Retourner la réponse
            return response()->json(['message' => 'Utilisateur créé avec succès!', 'user' => $user], 201);
        }
    
        // Connexion de l'utilisateur
        public function login(Request $request)
        {
            // Validation de la requête de connexion
            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                return response()->json(['message' => 'Connexion réussie', 'user' => $user], 200);
            }
    
            return response()->json(['message' => 'Identifiants incorrects'], 401);
        }
    }
    
