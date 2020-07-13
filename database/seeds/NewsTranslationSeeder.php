<?php

use App\NewsTranslation;
use Illuminate\Database\Seeder;

class NewsTranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(NewsTranslation::class, 5)->create();
    }
}
