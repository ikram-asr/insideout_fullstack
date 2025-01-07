<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etat extends Model
{
    use HasFactory;

    // La table associée à ce modèle
    protected $table = 'etat';

    // Les colonnes qui peuvent être remplies (mass assignment)
    protected $fillable = [
        'user_id',
        'sleep_quality',
        'sleep_hours',
        'study_hours',
        'mood',
        'date',
    ];

    /**
     * Relation avec le modèle User (utilisateur)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
