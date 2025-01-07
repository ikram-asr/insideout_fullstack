<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friendship extends Model
{
    use HasFactory;

    // La table associée à ce modèle
    protected $table = 'friendships';

    // Les colonnes qui peuvent être remplies (mass assignment)
    protected $fillable = [
        'user_id',
        'friend_id',
        'status',
    ];

    /**
     * Relation avec le modèle User (demandeur)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relation avec le modèle User (ami)
     */
    public function friend()
    {
        return $this->belongsTo(User::class, 'friend_id');
    }
}
