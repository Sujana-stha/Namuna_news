<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Language;
use App\Province;
use App\ProvinceTranslation;
use Faker\Generator as Faker;

$factory->define(ProvinceTranslation::class, function (Faker $faker) {
    return [
        'title' => $faker->word,
        'province_id' => function() {
            return Province::all()->random();
        },
        'language_id' => function() {
            return Language::all()->random();
        },
    ];
});
