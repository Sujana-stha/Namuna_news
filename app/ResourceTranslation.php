<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ResourceTranslation extends Model
{
    protected $fillable = ['resource_id', 'language_id', 'title', 'description'];

    public function resource() {
        return $this->belongsTo('App\AllResource');
    }

    public function language() {
        return $this->belongsTo('App\Language');
    }
}
