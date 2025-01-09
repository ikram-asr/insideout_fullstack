<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Mettre à jour les utilisateurs existants ou en ajouter de nouveaux
        DB::table('users')->updateOrInsert(
            ['email' => 'HandiOumaima@gmail.com'], // Vérifier par email
            [
                'nom' => 'Handi',
                'prenom' => 'Oumaima',
                'email' => 'HandiOumaima@gmail.com',
                'email_verified_at' => null,
                'password' => Hash::make('oumaima'),
                'profile_image' => 'uploads/profile_image.png', // Image de profil modifiée
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'AssiriIkram@gmail.com'], // Vérifier par email
            [
                'nom' => 'Assiri',
                'prenom' => 'Ikram',
                'email' => 'AssiriIkram@gmail.com',
                'email_verified_at' => '2024-12-01 14:30:00',
                'password' => Hash::make('ikram'),
                'profile_image' => 'uploads/profile_image.png', // Image de profil modifiée
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'KacimiLoubna@gmail.com'], // Vérifier par email
            [
                'nom' => 'Kacimi',
                'prenom' => 'Loubna',
                'email' => 'KacimiLoubna@gmail.com',
                'email_verified_at' => '2024-12-02 10:15:00',
                'password' => Hash::make('loubna'),
                'profile_image' => 'uploads/profile_image.png', // Image de profil modifiée
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('users')->updateOrInsert(
            ['email' => 'MajdoulDoae@gmail.com'], // Vérifier par email
            [
                'nom' => 'Majdoul',
                'prenom' => 'Doae',
                'email' => 'MajdoulDoae@gmail.com',
                'email_verified_at' => '2024-12-02 10:15:00',
                'password' => Hash::make('doae'),
                'profile_image' => 'uploads/profile_image.png', // Image de profil modifiée
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
