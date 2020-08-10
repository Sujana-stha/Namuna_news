<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
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
            'type' => $this->type,
            'url' => $this->url,
            'status' => $this->status,
            'keywords' => $this->keywords,
            'videos' => $this->videoResources,
            'translations' => [$this->resourceTranslations]
        ];
    }
}
