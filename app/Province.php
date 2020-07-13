<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    protected $fillable = ['slug', 'display_status', 'order'];

    public function provinceTranslations() {
        return $this->hasMany('App\ProvinceTranslation');
    }

    public function news() {
        return $this->hasMany('App\News');
    }
}
