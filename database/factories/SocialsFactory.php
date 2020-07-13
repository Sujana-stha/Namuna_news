<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Socials;
use Faker\Generator as Faker;

$factory->define(Socials::class, function (Faker $faker) {
    return [
        'title' => $faker->title, 
        'icon_class'=> $faker->word,
        'link' => $faker->url,
        'order' => $faker->numberBetween(1,5)
    ];
});
