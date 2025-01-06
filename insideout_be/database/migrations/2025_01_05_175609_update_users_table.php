<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUsersTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Modifier ou ajouter des colonnes
            $table->renameColumn('name', 'nom'); 
            $table->string('prenom'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('nom', 'name'); // Revenir au nom original
            $table->dropColumn('prenom'); // Supprimer la colonne 'prenom'
        });
    }
}
