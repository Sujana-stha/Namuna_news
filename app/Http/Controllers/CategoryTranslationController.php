<?php

namespace App\Http\Controllers;

use App\CategoryTranslation;
use Illuminate\Http\Request;

class CategoryTranslationController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $translations = CategoryTranslation::all();

        return response()->json($translations);
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
        $validateData = $request->validate([
            'title'=>'required',
            'category_id' => 'required|min:1',
            'language_id' => 'required|min:1'
        ]);

        CategoryTranslation::create($request->all());

        return response(['success' => 'Category translation stored successfully...'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CategoryTranslation  $categoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function show(CategoryTranslation $categoryTranslation)
    {
        return response()->json($categoryTranslation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CategoryTranslation  $categoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function edit(CategoryTranslation $categoryTranslation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CategoryTranslation  $categoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CategoryTranslation $categoryTranslation)
    {
        $categoryTranslation->update($request->all());

        return response(['success' => 'Category Translation updated successfully...'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CategoryTranslation  $categoryTranslation
     * @return \Illuminate\Http\Response
     */
    public function destroy(CategoryTranslation $categoryTranslation)
    {
        $categoryTranslation->delete();

        return response(['success' => 'Category Translation deleted successfully'], 204);
    }
}
