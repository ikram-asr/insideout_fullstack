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
        Schema::create('posts', function (Blueprint $table) {
            $table->id(); // ID unique pour chaque post
            $table->unsignedBigInteger('user_id'); // L'utilisateur qui a créé le post
            $table->text('content'); // Contenu du post
            $table->string('image')->nullable(); // Image associée au post (optionnelle)
            $table->timestamps();

            // Clé étrangère pour relier l'utilisateur
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
