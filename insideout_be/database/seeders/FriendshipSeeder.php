<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FriendshipSeeder extends Seeder
{
    public function run()
    {
        DB::table('friendships')->insert([
            ['user_id' => 1, 'friend_id' => 2, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'friend_id' => 3, 'status' => 'pending', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'friend_id' => 4, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'friend_id' => 5, 'status' => 'blocked', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'friend_id' => 10, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'friend_id' => 1, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'friend_id' => 2, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'friend_id' => 3, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'friend_id' => 4, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'friend_id' => 5, 'status' => 'accepted', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
