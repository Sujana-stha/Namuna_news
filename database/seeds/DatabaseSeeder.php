<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        // $this->call(CategorySeeder::class);
        // $this->call(CategoryTranslationSeeder::class);
        // $this->call(ProvinceSeeder::class);
        // $this->call(ProvinceTranslationSeeder::class);
        // $this->call(SubscriberSeeder::class);
        // $this->call(CategorySubscriberSeeder::class);
        // $this->call(AllResourceSeeder::class);
        // $this->call(VideoResourceSeeder::class);
        // $this->call(ResourceTranslationSeeder::class);
        // $this->call(NewsSeeder::class);
        $this->call(NewsTranslationSeeder::class);
    }
}
