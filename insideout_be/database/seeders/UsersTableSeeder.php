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
        DB::table('users')->insert([
            [
                'nom' => 'Handi',
                'prenom' => 'Oumaima',
                'email' => 'HandiOumaima@gmail.com',
                'email_verified_at' => null,
                'password' => Hash::make('oumaima'), // Hash the password for security
                'profile_image' => 'profile_images/default_profile_image.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Assiri',
                'prenom' => 'Ikram',
                'email' => 'AssiriIkram@gmail.com',
                'email_verified_at' => '2024-12-01 14:30:00',
                'password' => Hash::make('ikram'),
                'profile_image' => 'profile_images/default_profile_image.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Kacimi',
                'prenom' => 'Loubna',
                'email' => 'KacimiLoubna@gmail.com',
                'email_verified_at' => '2024-12-02 10:15:00',
                'password' => Hash::make('loubna'),
                'profile_image' => 'profile_images/default_profile_image.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nom' => 'Majdoul',
                'prenom' => 'Doae',
                'email' => 'MajdoulDoae@gmail.com',
                'email_verified_at' => '2024-12-02 10:15:00',
                'password' => Hash::make('doae'),
                'profile_image' => 'profile_images/default_profile_image.png',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
