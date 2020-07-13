<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProvinceResource extends JsonResource
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
            'display_status' => $this->display_status,
            'order' => $this->order,
            'province-translations' => [
                $this->provinceTranslations
            ],
            'news' => [
                $this->news
            ]
        ];
    }
}
