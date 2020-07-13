<?php

use Illuminate\Database\Seeder;

class AllResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\AllResource::class, 5)->create();
    }
}
