<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * Relation avec les posts de l'utilisateur (un utilisateur peut créer plusieurs posts)
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Relation avec les commentaires écrits par l'utilisateur
     */
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    /**
     * Relation avec les messages envoyés par l'utilisateur
     */
    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    /**
     * Relation avec les messages reçus par l'utilisateur
     */
    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    /**
     * Relation avec les amitiés (un utilisateur peut avoir plusieurs amis)
     */
    public function friendships()
    {
        return $this->hasMany(Friendship::class, 'user_id');
    }

    /**
     * Relation avec les utilisateurs amis (un utilisateur peut avoir plusieurs amis)
     */
    public function friends()
    {
        return $this->belongsToMany(User::class, 'friendships', 'user_id', 'friend_id')
                    ->withPivot('status')
                    ->withTimestamps();
    }

    /**
     * Relation avec les états de l'utilisateur
     */
    public function etats()
    {
        return $this->hasMany(Etat::class);
    }

    /**
     * Relation avec les réactions de l'utilisateur (un utilisateur peut réagir à plusieurs posts)
     */
    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }
}
