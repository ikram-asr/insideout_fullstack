<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function getAllUsers()
    {
        $users = User::all();  // Vous pouvez ajouter des filtres ou des relations si nécessaire
        return response()->json($users);  // Retourner les utilisateurs sous forme de JSON
    }}
