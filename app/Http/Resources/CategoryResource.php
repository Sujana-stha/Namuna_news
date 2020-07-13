<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'slug' => $this->slug,
            'parent' => ($this->parent_id !== 0) ? route('categories.show', $this->parent_id) : 'No Parent',
            'display_status' => $this->display_status,
            'order' => $this->order,
            'category-translations' => [
                $this->categoryTranslations
            ],
            'subscribers' => [
                $this->subscribers
            ],
            'news' => [
                $this->news
            ]
        ];
    }
}
