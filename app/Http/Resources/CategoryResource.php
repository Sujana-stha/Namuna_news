<?php

namespace App\Http\Resources;

use App\Category;
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
            'parent_id'=>$this->parent_id,
            'parent' => ($this->parent_id !== 0) ? Category::find($this->parent_id)->slug : 'None',
            'display_status' => $this->display_status,
            'order' => $this->order,
            'category-translations' => [
                $this->categoryTranslations
            ],
            'subscribers' => [
                $this->subscribers
            ],
            'news' => [
                NewsResource::collection($this->news)
            ]
        ];
    }
}
