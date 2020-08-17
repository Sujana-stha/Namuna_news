<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class NewsResource extends JsonResource
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
            'category' => collect($this->category)->only('id','slug'),
            'province' => collect($this->province)->only('id','slug'),
            'status' => $this->status,
            'keywords' => $this->keywords,
            'order' => $this->order,
            'author' => $this->author->name,
            'news_label' => $this->news_label,
            'featured_image' => Storage::url($this->featured_image),
            'news_translations' => [$this->newsTranslations]
        ];
    }
}
