<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostSeeder extends Seeder
{
    public function run()
    {
        DB::table('posts')->insert([
            ['user_id' => 1, 'content' => 'My first post!', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'content' => 'Laravel is awesome!', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'content' => 'Check out my latest photo.', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'content' => 'Feeling great today!', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'content' => 'Looking forward to the weekend.', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'content' => 'Hello everyone!', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'content' => 'today i wanna eat a croissant', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
