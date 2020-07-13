<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AllResource;
use App\VideoResource;
use Faker\Generator as Faker;

$factory->define(VideoResource::class, function (Faker $faker) {
    return [
        'resource_id' => function() {
            return AllResource::where('type','video')->get()->random();
        },
        'order'=>$faker->numberBetween(1,5),
        'views'=>$faker->randomNumber()
    ];
});
