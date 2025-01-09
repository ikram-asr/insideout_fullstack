<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UsersTableSeeder::class,
            PostSeeder::class,
            MessageSeeder::class,
            EtatSeeder::class,
            ReactionSeeder::class,
            FriendshipSeeder::class,
        ]);
        // User::factory(10)->create();

    }
}
