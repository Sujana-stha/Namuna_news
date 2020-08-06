<?php

namespace App\Http\Resources;

use App\Language;
use App\Province;
use Illuminate\Http\Resources\Json\JsonResource;

class ProvinceTranslationResource extends JsonResource
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
            'province'=>collect(Province::find($this->province_id))->only('id','slug'),
            'language'=>collect(Language::find($this->language_id))->except('created_at','updated_at')
        ];
    }
}
