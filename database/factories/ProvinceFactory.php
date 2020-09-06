<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Province;
use Faker\Generator as Faker;

$factory->define(Province::class, function (Faker $faker) {
    return [
        'slug'=>$faker->word,
        'display_status'=>$faker->randomElement($array = array('0','1'), $count = 1),
        'order'=>$faker->numberBetween(0,5)
    ];
});
