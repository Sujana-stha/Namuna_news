<?php

namespace App\Http\Resources;

use App\Category;
use App\Language;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryTranslationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => collect(Category::find($this->category_id))->except('created_at','updated_at'),
            'language' => collect(Language::find($this->language_id))->except('created_at','updated_at')
        ];
    }
}
