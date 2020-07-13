<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\CategoryTranslation;
use Faker\Generator as Faker;

use App\Category;
use App\Language;

$factory->define(CategoryTranslation::class, function (Faker $faker) {
    return [
        'category_id' => function() {
            return Category::all()->random();
        },
        'language_id' => function() {
            return Language::all()->random();
        },
        'title' => $faker->title
    ];
});
