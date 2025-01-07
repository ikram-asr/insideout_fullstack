<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reaction extends Model
{
    use HasFactory;

    // La table associée à ce modèle
    protected $table = 'reactions';

    // Les colonnes qui peuvent être remplies (mass assignment)
    protected $fillable = [
        'post_id',
        'user_id',
        'type',
    ];

    /**
     * Relation avec le modèle Post
     */
    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

    /**
     * Relation avec le modèle User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
