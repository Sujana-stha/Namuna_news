<?php

use Illuminate\Database\Seeder;

class CategoryTranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\CategoryTranslation::class, 10)->create();
    }
}
