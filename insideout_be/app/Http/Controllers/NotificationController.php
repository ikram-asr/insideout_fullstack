<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    // Fonction pour envoyer une notification
    public function sendNotification(Request $request)
    {
        $notification = Notification::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);

        return response()->json($notification);
    }

    // Fonction pour récupérer les notifications de l'utilisateur
    public function getNotifications($userId)
    {
        $notifications = Notification::where('receiver_id', $userId)->get();
        return response()->json($notifications);
    }


    public function markNotificationsAsRead($userId, $friendId)
    {
        Notification::where('receiver_id', $userId)
            ->where('sender_id', $friendId)
            ->update(['read' => true]);
    
        return response()->json(['message' => 'Notifications marked as read']);
    }
    
    

}
