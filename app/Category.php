<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['slug', 'parent_id', 'display_status', 'order'];

    public function categoryTranslations() {
        return $this->hasMany('App\CategoryTranslation');
    }

    public function subscribers() {
        return $this->belongsToMany('App\Subscriber', 'App\CategorySubscriber');
    }

    public function news() {
        return $this->hasMany('App\News');
    }
}

