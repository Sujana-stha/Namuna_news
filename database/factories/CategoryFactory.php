<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use Faker\Generator as Faker;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'slug'=>$faker->word,
        'parent_id'=>$faker->numberBetween(0, 5),
        'display_status'=>$faker->randomElement($array = array('show','hide'), $count = 1),
        'order'=>$faker->numberBetween(0,5)
    ];
});
