<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $fillable = ['email', 'category_id', 'preference'];

    public function categories() {
        return $this->belongsToMany('App\Category', 'App\CategorySubscriber');
    }

    protected $casts = [
        'category_id' => 'array'
    ];
}
