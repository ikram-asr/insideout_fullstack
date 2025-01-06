<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reactions', function (Blueprint $table) {
            $table->id(); // ID unique pour chaque réaction
            $table->unsignedBigInteger('post_id'); // Le post auquel la réaction est associée
            $table->unsignedBigInteger('user_id'); // L'utilisateur qui a fait la réaction
            $table->enum('type', ['sad', 'happy', 'angry', 'shy']); // Type de réaction
            $table->timestamps();

            // Clés étrangères
            $table->foreign('post_id')->references('id')->on('posts')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reactions');
    }
};
