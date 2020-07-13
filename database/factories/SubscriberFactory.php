<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use App\Subscriber;
use Faker\Generator as Faker;

$factory->define(Subscriber::class, function (Faker $faker) {
    return [
        'email' => $faker->email,
        'category_id' => function() {
            return Category::all()->random();
        },
        'preference' => $faker->randomElement($array = array('daily','weekly','monthly','none'), $count = 1)
    ];
});
