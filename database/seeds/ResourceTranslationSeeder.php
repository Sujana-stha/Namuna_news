<?php

use Illuminate\Database\Seeder;

class ResourceTranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\ResourceTranslation::class, 5)->create();
    }
}
