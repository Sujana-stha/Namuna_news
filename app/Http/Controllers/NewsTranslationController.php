<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsTranslationResource;
use App\NewsTranslation;
use Illuminate\Http\Request;

class NewsTranslationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $translations = NewsTranslation::paginate(10);

        return NewsTranslationResource::collection($translations);
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
            'news_id'=>'required|min:1',
            'language_id'=>'required|min:1',
            'title'=>'required',
            'content'=>'required'
        ]);

        NewsTranslation::create($request->all());

        return response(['success'=>'News translation created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\NewsTranslation  $news_translation
     * @return \Illuminate\Http\Response
     */
    public function show(NewsTranslation $news_translation)
    {
        return new NewsTranslationResource($news_translation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\NewsTranslation  $news_translation
     * @return \Illuminate\Http\Response
     */
    public function edit(NewsTranslation $news_translation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\NewsTranslation  $news_translation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NewsTranslation $news_translation)
    {
        $news_translation->update($request->all());

        return response(['success'=>'News Translation updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\NewsTranslation  $news_translation
     * @return \Illuminate\Http\Response
     */
    public function destroy(NewsTranslation $news_translation)
    {
        $news_translation->delete();

        return response(['success'=>'News Translation deleted successfully'], 204);
    }
}
