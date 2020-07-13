<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoryTranslation extends Model
{
    protected $fillable = ['category_id', 'language_id', 'title'];

    public function category() {
        return $this->belongsTo('App\Category');
    }

    public function language() {
        return $this->belongsTo('App\Language');
    }
}
