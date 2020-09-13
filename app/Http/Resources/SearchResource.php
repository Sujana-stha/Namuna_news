<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SearchResource extends JsonResource
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
            'title'=>$this->title,
            'content'=>$this->content,
            'language_code'=>$this->language->code,
            'news_slug'=>$this->news->slug,
            'news_id'=>$this->news->id,
            'news_image'=>$this->news->featured_image
        ];
    }
}
