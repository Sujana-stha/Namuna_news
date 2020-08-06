<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NewsTranslation extends Model
{
    protected $fillable = ['news_id', 'language_id', 'title', 'content'];

    public function news() {
        return $this->belongsTo('App\News');
    }

    public function language() {
        return $this->belongsTo('App\Language');
    }
}
