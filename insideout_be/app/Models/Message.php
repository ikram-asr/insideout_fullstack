<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    // La table associée à ce modèle
    protected $table = 'messages';

    // Les colonnes qui peuvent être remplies (mass assignment)
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'content',
    ];

    /**
     * Relation avec le modèle User (expéditeur)
     */
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    /**
     * Relation avec le modèle User (récepteur)
     */
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
