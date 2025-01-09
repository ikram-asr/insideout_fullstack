<?php

namespace App\Http\Controllers;

use App\Models\Etat;
use Illuminate\Http\Request;
use Validator ;
class EtatController extends Controller
{
  /*  public function saveSleepQuality(Request $request)
{
    try {
        // Validation des données
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'sleep_quality' => 'required|in:excellent,good,fair,poor,terrible',
'sleep_hours' => 'nullable|numeric', // ou 'nullable|decimal:4,2' si tu veux valider la précision
'sleep_minutes' => 'nullable|numeric',

         'mood' => 'nullable|in:happy,anxious,angry,sad,afraid,bored,shy',

'date' => 'nullable|date_format:Y-m-d', // Vérifie que la date est au format 'YYYY-MM-DD'
        ]);

        // Créer ou mettre à jour l'état de l'utilisateur
        $etat = Etat::updateOrCreate(
            ['user_id' => $request->user_id],
            [
                'sleep_quality' => $request->sleep_quality,
                'sleep_hours' => $request->sleep_hours,
                'sleep_minutes' => $request->sleep_minutes,
                'mood' => $request->mood,
                'date' => $request->date
            ]
        );

        return response()->json(['message' => 'Qualité de sommeil enregistrée avec succès.', 'etat' => $etat], 200);
    } catch (\Exception $e) {
        // Retourner l'erreur avec un message détaillé
        return response()->json(['error' => 'Erreur lors de l\'enregistrement : ' . $e->getMessage()], 500);
    }
}


// Fonction pour enregistrer l'humeur (question 2)
public function saveMood(Request $request)
{
    // Validation des données envoyées
    $request->validate([
        'user_id' => 'required|integer|exists:users,id',
        'mood' => 'required|string',
        'date' => 'required|date',
    ]);

    // Créer une nouvelle entrée dans la table 'etats'
    $etat = new Etat();
    $etat->user_id = $request->user_id;
    $etat->mood = $request->mood;
    $etat->date = $request->date;
    // Laisser les autres champs à null s'ils ne sont pas envoyés
    $etat->save();

    return response()->json(['message' => 'Humeur enregistrée avec succès', 'data' => $etat], 200);
}*/


public function saveEtat(Request $request)
{
    // Validation des données envoyées
    $request->validate([
        'user_id' => 'required|integer', // Vérifie que user_id est un entier
        'sleep_quality' => 'nullable|required|in:excellent,good,fair,poor,terrible', // Peut être null ou un entier
        'sleep_hours' => 'nullable|numeric', // Peut être null ou un entier
        'sleep_minutes' => 'nullable|numeric', // Peut être null ou un entier
        'mood' => 'nullable|in:happy,anxious,angry,sad,afraid,bored,shy', // Peut être null ou une chaîne de caractères
        'date' => 'required|date_format:Y-m-d', // Vérifie que la date est dans le format 'YYYY-MM-DD'
    ]);

    // Créer une nouvelle entrée dans la table 'etats'
    $etat = new Etat();
    $etat->user_id = $request->user_id; // ID de l'utilisateur
    $etat->sleep_quality = $request->sleep_quality; // Qualité du sommeil
    $etat->sleep_hours = $request->sleep_hours; // Heures de sommeil
    $etat->sleep_minutes = $request->sleep_minutes; // Minutes de sommeil
    $etat->mood = $request->mood; // Humeur
    $etat->date = $request->date; // Date du système

    // Laisser les autres champs à null s'ils ne sont pas envoyés
    $etat->save(); // Sauvegarde de l'état

    // Retourner une réponse JSON avec le message et les données sauvegardées
    return response()->json(['message' => 'Données sauvegardées avec succès', 'data' => $etat], 200);
}


}
