<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Category;
use App\News;
use App\Province;
use App\User;
use Faker\Generator as Faker;

$factory->define(News::class, function (Faker $faker) {
    return [
        'slug'=>$faker->word,
        'category_id'=>function() {
            return Category::all()->random();
        },
        'province_id'=>function() {
            return Province::all()->random();
        },
        'status'=>$faker->randomElement($array = array('active','draft','hidden','deleted'), $count = 1),
        'keywords'=>$faker->word,
        'order'=>$faker->numberBetween(1,5),
        'author_id'=>function() {
            return User::all()->random();
        },
        'featured_image'=>$faker->word.".jpg",
        'news_label'=>$faker->randomElement($array = array('featured','breaking'), $count = 1)
    ];
});
