<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategorySubscriber extends Model
{
    protected $table = 'category_subscriber';

    protected $fillable = ['category_id', 'subscriber_id'];
}
