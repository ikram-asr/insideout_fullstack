<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReactionSeeder extends Seeder
{
    public function run()
    {
        DB::table('reactions')->insert([
            ['post_id' => 1, 'user_id' => 2, 'type' => 'happy', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 2, 'user_id' => 3, 'type' => 'sad', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 3, 'user_id' => 4, 'type' => 'angry', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 4, 'user_id' => 5, 'type' => 'shy', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 5, 'user_id' => 10, 'type' => 'happy', 'created_at' => now(), 'updated_at' => now()],
            ['post_id' => 6, 'user_id' => 1, 'type' => 'shy', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
