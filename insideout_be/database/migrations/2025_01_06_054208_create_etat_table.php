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
        Schema::create('etat', function (Blueprint $table) {
            $table->id(); // ID unique pour chaque état
            $table->unsignedBigInteger('user_id'); // L'utilisateur associé à cet état
            $table->enum('sleep_quality', ['excellent', 'good', 'fair', 'poor', 'terrible'])->comment('Qualité du sommeil');
            $table->decimal('sleep_hours', 4, 2)->comment('Heures de sommeil (ex: 7.5)');
            $table->decimal('study_hours', 4, 2)->comment('Heures d\'étude (ex: 3.25)');
            $table->enum('mood', ['happy', 'anxious', 'angry', 'sad', 'afraid', 'bored', 'shy'])->comment('Humeur');
            $table->date('date')->comment('Date de cet état');
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
        Schema::dropIfExists('etat');
    }
};
