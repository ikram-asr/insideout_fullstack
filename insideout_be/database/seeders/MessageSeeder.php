<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MessageSeeder extends Seeder
{
    public function run()
    {
        DB::table('messages')->insert([
            ['sender_id' => 1, 'receiver_id' => 2, 'content' => 'Hi, how are you?', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 2, 'receiver_id' => 3, 'content' => 'What\'s up?', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 3, 'receiver_id' => 4, 'content' => 'Check out this ', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 4, 'receiver_id' => 5, 'content' => 'Good morning!', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 5, 'receiver_id' => 1, 'content' => 'Let\'s meet up.', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 10, 'receiver_id' => 1, 'content' => 'Hello!', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 10, 'receiver_id' => 3, 'content' => 'cc', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 3, 'receiver_id' => 10, 'content' => 'its not me', 'created_at' => now(), 'updated_at' => now()],
            ['sender_id' => 10, 'receiver_id' => 2, 'content' => 'bifoooo', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
