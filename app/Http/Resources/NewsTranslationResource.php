<?php

namespace App\Http\Resources;

use App\Language;
use App\News;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsTranslationResource extends JsonResource
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
            'id'=>$this->id,
            'title'=>$this->title,
            'content'=>$this->content,
            'news'=>collect(News::find($this->news_id))->only('id','slug'),
            'language'=>collect(Language::find($this->language_id))->except('created_at', 'updated_at')
        ];
    }
}
