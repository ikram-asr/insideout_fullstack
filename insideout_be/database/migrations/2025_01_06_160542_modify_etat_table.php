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
        Schema::table('etat', function (Blueprint $table) {
                $table->enum('sleep_quality', ['excellent', 'good', 'fair', 'poor', 'terrible'])->nullable()->change();
            $table->decimal('sleep_hours', 4, 2)->nullable()->change();
            $table->decimal('study_hours', 4, 2)->nullable()->change();
            $table->enum('mood', ['happy', 'anxious', 'angry', 'sad', 'afraid', 'bored', 'shy'])->nullable()->change();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('etat', function (Blueprint $table) {
            $table->enum('sleep_quality', ['excellent', 'good', 'fair', 'poor', 'terrible'])->nullable(false)->change();
            $table->decimal('sleep_hours', 4, 2)->nullable(false)->change();
            $table->decimal('study_hours', 4, 2)->nullable(false)->change();
            $table->enum('mood', ['happy', 'anxious', 'angry', 'sad', 'afraid', 'bored', 'shy'])->nullable(false)->change();
        });
    }
};
