<?php

use Illuminate\Database\Seeder;

class CategorySubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\CategorySubscriber::class, 5)->create();
    }
}
