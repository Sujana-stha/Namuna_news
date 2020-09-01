<?php

namespace App\Http\Controllers;

use App\AllResource;
use App\Category;
use App\CategoryTranslation;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CategoryTranslationResource;
use App\Http\Resources\LanguageResource;
use App\Http\Resources\MediaResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\NewsTranslationResource;
use App\Http\Resources\ProvinceResource;
use App\Http\Resources\ProvinceTranslationResource;
use App\Http\Resources\ResourcesTranslationResource;
use App\Language;
use App\News;
use App\NewsTranslation;
use App\Province;
use App\ProvinceTranslation;
use App\ResourceTranslation;

class MasterGetController extends Controller
{
    public function getLanguages() {
        $languages = Language::latest()->get();

        return LanguageResource::collection($languages);
    }

    public function getCategories() {
        $categories = Category::latest()->get();

        return CategoryResource::collection($categories);
    }

    public function getCategoryTranslations() {
        $category_translations = CategoryTranslation::latest()->get();

        return CategoryTranslationResource::collection($category_translations);
    }

    public function getProvinces() {
        $provinces = Province::latest()->get();

        return ProvinceResource::collection($provinces);
    }

    public function getProvinceTranslations() {
        $province_translations = ProvinceTranslation::latest()->get();

        return ProvinceTranslationResource::collection($province_translations);
    }

    public function getResources() {
        $resources = AllResource::latest()->get();

        return MediaResource::collection($resources);
    }

    public function getResourceTranslations() {
        $resource_translations = ResourceTranslation::latest()->get();

        return ResourcesTranslationResource::collection($resource_translations);
    }

    public function getNews() {
        $news = News::latest()->get();

        return NewsResource::collection($news);
    }

    public function getNewsTranslations() {
        $news_translations = NewsTranslation::latest()->get();

        return NewsTranslationResource::collection($news_translations);
    }

}
