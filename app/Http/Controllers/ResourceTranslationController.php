<?php

namespace App\Http\Controllers;

use App\Http\Resources\ResourcesTranslationResource;
use App\ResourceTranslation;
use Illuminate\Http\Request;

class ResourceTranslationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $translations = ResourceTranslation::paginate(10);

        return ResourcesTranslationResource::collection($translations);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'resource_id'=>'required',
            'language_id'=>'required',
            'title'=>'required'
        ]);

        ResourceTranslation::create($request->all());

        return response(['success'=>'Resource Translation created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ResourceTranslation  $resourceTranslation
     * @return \Illuminate\Http\Response
     */
    public function show(ResourceTranslation $resource_translation)
    {
        return new ResourcesTranslationResource($resource_translation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ResourceTranslation  $resourceTranslation
     * @return \Illuminate\Http\Response
     */
    public function edit(ResourceTranslation $resource_translation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ResourceTranslation  $resourceTranslation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ResourceTranslation $resource_translation)
    {
        $resource_translation->update($request->all());

        return response(['success'=>'Resource Translation updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ResourceTranslation  $resourceTranslation
     * @return \Illuminate\Http\Response
     */
    public function destroy(ResourceTranslation $resource_translation)
    {
        $resource_translation->delete();

        return response(['success'=>'Resource translation deleted successfully'], 204);
    }
}
