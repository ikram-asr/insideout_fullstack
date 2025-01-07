<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    // La table associée à ce modèle
    protected $table = 'comments';

    // Les colonnes qui peuvent être remplies (mass assignment)
    protected $fillable = [
        'post_id',
        'user_id',
        'content',
    ];

    /**
     * Relation avec le modèle Post (post auquel le commentaire est associé)
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    /**
     * Relation avec le modèle User (utilisateur qui a écrit le commentaire)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
