<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VideoResource extends Model
{
    protected $fillable = ['resource_id','order','views'];

    public function resource() {
        return $this->belongsTo('App\AllResource');
    }
}
