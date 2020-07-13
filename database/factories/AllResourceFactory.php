<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AllResource;
use Faker\Generator as Faker;

$factory->define(AllResource::class, function (Faker $faker) {
    return [
        'type' => $faker->randomElement($array = array('video','file'), $count = 1),
        'url' => $faker->imageUrl(),
        'status' => $faker->randomElement($array = array('active','draft', 'hidden', 'deleted'), $count = 1),
        'keywords' => $faker->word
    ];
});
