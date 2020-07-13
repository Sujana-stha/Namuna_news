<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProvinceTranslation extends Model
{
    protected $fillable = ['title', 'province_id', 'language_id'];

    public function province() {
        return $this->belongsTo('App\Province');
    }
}
