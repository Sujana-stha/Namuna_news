<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\AllResource;
use App\Language;
use App\ResourceTranslation;
use Faker\Generator as Faker;

$factory->define(ResourceTranslation::class, function (Faker $faker) {
    return [
        'resource_id' => function() {
            return AllResource::all()->random();
        },
        'language_id' => function() {
            return Language::all()->random();
        },
        'title' => $faker->paragraph(1),
        'description' => $faker->paragraph(3)
    ];
});
