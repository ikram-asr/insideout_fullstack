<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ['receiver_id', 'sender_id', 'content', 'read'];

    // Relation avec l'utilisateur qui reçoit la notification
    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    // Relation avec l'utilisateur qui envoie la notification
    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }
}