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
                // Renommer les colonnes
                $table->renameColumn('sleep_hours', 'sleep_hours');
                $table->renameColumn('study_hours', 'sleep_minutes');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('etat', function (Blueprint $table) {
                // Annuler les renommages
                $table->renameColumn('sleep_time', 'sleep_hours');
                $table->renameColumn('study_time', 'sleep_minutes');
            
        });
    }
};
