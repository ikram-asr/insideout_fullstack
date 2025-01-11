<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('receiver_id')->constrained('users')->onDelete('cascade'); // ID de l'ami qui reçoit la notification
            $table->foreignId('sender_id')->constrained('users')->onDelete('cascade'); // ID de l'utilisateur qui envoie le message
            $table->text('content'); // Le contenu de la notification
            $table->boolean('read')->default(false); // Si la notification a été lue
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
