<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // La table associée à ce modèle
    protected $table = 'posts';

    // Les colonnes qui peuvent être remplies (mass assignment)
    protected $fillable = [
        'user_id',
        'content',
        'image',
    ];

    /**
     * Relation avec le modèle User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Relation avec le modèle Reaction
     */
    public function reactions()
    {
        return $this->hasMany(Reaction::class, 'post_id');
    }
}
