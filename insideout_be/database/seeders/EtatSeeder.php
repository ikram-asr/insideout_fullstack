<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EtatSeeder extends Seeder
{
    public function run()
    {
        DB::table('etat')->insert([
            ['user_id' => 1, 'sleep_quality' => 'excellent', 'sleep_hours' => 8, 'study_hours' => 4, 'mood' => 'happy','date'=> now(), 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 2, 'sleep_quality' => 'good', 'sleep_hours' => 7, 'study_hours' => 5, 'mood' => 'anxious','date'=> now(), 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 3, 'sleep_quality' => 'fair', 'sleep_hours' => 6, 'study_hours' => 3, 'mood' => 'sad','date'=> now(), 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 4, 'sleep_quality' => 'poor', 'sleep_hours' => 5, 'study_hours' => 6, 'mood' => 'angry','date'=> now(), 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 5, 'sleep_quality' => 'terrible', 'sleep_hours' => 4, 'study_hours' => 2, 'mood' => 'bored','date'=> now(), 'created_at' => now(), 'updated_at' => now()],
            ['user_id' => 10, 'sleep_quality' => 'good', 'sleep_hours' => 7, 'study_hours' => 8, 'mood' => 'happy','date'=> now(), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

