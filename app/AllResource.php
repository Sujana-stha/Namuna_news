<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AllResource extends Model
{
    protected $fillable = ['type','url','status','keywords'];

    public function videoResources() {
        return $this->hasMany('App\VideoResource', 'resource_id', 'id');
    }

    public function resourceTranslations() {
        return $this->hasMany('App\ResourceTranslation', 'resource_id', 'id');
    }
}
