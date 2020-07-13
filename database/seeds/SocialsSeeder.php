<?php

use Illuminate\Database\Seeder;

class SocialsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Socials::class, 5)->create();
    }
}
