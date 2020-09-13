<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\NewsSubscriber;
use Faker\Generator as Faker;

$factory->define(NewsSubscriber::class, function (Faker $faker) {
    return [
        'email'=>$faker->email
    ];
});
