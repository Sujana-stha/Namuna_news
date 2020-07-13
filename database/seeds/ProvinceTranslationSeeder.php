<?php

use Illuminate\Database\Seeder;

class ProvinceTranslationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\ProvinceTranslation::class, 10)->create();
    }
}
