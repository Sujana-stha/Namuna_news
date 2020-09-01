<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsResource;
use App\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = News::paginate(10);

        return NewsResource::collection($news);
        // return response()->json($news);
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
            "slug"=>"required",
            "category_id"=>"required|min:1",
            "province_id"=>"required|min:1",
            "status"=>"required",
            "featured_image"=>"required|mimes:jpg,jpeg,png"
        ]);

        $featured_image = $request->file('featured_image')->store('public/news');

        News::create([
            "slug"=>$request->slug,
            "category_id"=>$request->category_id,
            "province_id"=>$request->province_id,
            "status"=>$request->status,
            "order"=>News::max('order')+1,
            "keywords"=>$request->keywords,
            "author_id"=>auth()->id(),
            "news_label"=>$request->news_label,
            "featured_image"=>$featured_image,
        ]);

        return response(['success'=>'News stored successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
        return new NewsResource($news);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, News $news)
    {
        $featured_image = $news->featured_image;

        if($request->file('featured_image')) {
            \Storage::delete($featured_image);
            $featured_image = $request->file('featured_image')->store('public/news');
            $news->update(['featured_image'=>$featured_image]);
        }

        $news->update($request->except('featured_image'));

        return response(['success'=>'News updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news)
    {
        $news->delete();

        return response(['success'=>'News deleted successfully'], 204);
    }
}
