<?php

use App\VideoResource;
use Illuminate\Database\Seeder;

class VideoResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(VideoResource::class, 5)->create();
    }
}
