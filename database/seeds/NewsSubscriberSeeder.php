<?php

use Illuminate\Database\Seeder;

class NewsSubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\NewsSubscriber::class, 5)->create();
    }
}
