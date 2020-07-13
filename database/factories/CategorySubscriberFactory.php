<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\CategorySubscriber;
use Faker\Generator as Faker;

$factory->define(CategorySubscriber::class, function (Faker $faker) {
    return [
        'category_id'=>function() {
            return App\Category::all()->random();
        },
        'subscriber_id'=>function() {
            return App\Subscriber::all()->random();
        }
    ];
});
