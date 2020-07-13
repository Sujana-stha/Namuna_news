<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Language;
use App\News;
use App\NewsTranslation;
use Faker\Generator as Faker;

$factory->define(NewsTranslation::class, function (Faker $faker) {
    return [
        'news_id'=>function() {
            return News::all()->random();
        },
        'language_id'=>function() {
            return Language::all()->random();
        },
        'title'=>$faker->paragraph(1),
        'content'=>$faker->paragraph(3)
    ];
});
