<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('register', 'AuthController@register');
});

Route::apiResource('/languages', 'LanguageController');
Route::apiResource('/socials', 'SocialsController');
Route::apiResource('/categories', 'CategoryController');
Route::apiResource('/category-translation', 'CategoryTranslationController');
Route::apiResource('/province', 'ProvinceController');
Route::apiResource('/province-translation', 'ProvinceTranslationController');
Route::apiResource('/subscriber', 'SubscriberController');
Route::apiResource('/resources', 'AllResourceController');
Route::apiResource('/resource-translation', 'ResourceTranslationController');
Route::apiResource('/news', 'NewsController');
Route::apiResource('/news-translation', 'NewsTranslationController');
