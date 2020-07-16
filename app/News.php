<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    protected $fillable = ['slug', 'category_id', 'province_id', 'status', 'keywords', 'order', 'author_id', 'featured_image', 'news_label'];

    public function category() {
        return $this->belongsTo('App\Category');
    }

    public function province() {
        return $this->belongsTo('App\Province');
    }

    public function author() {
        return $this->belongsTo('App\User', 'author_id', 'id');
    }

    public function newsTranslations()
    {
        return $this->hasMany('App\NewsTranslation');
    }
}
