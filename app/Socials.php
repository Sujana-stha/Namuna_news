<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Socials extends Model
{
    protected $fillable = ['title', 'icon_class','link','order'];
}
