<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    protected $fillable = ['code', 'language'];

    public function categoryTranslations() {
        return $this->hasMany('App\CategoryTranslation');
    }

    public function resourceTranslations() {
        return $this->hasMany('App\ResourceTranslation');
    }

    public function newsTranslations() {
        return $this->hasMany('App\NewsTranslation');
    }
}
