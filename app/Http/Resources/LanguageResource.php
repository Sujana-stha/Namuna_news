<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LanguageResource extends JsonResource
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
            'code'=>$this->code,
            'language'=>$this->language,
            'category_translations'=>$this->categoryTranslations,
            'resource_translations'=>$this->resourceTranslations
            // 'news_translations'=>NewsTranslationResource::collection($this->news_translations)
        ];
    }
}
