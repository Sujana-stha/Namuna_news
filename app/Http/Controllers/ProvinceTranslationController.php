<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProvinceTranslationResource;
use App\ProvinceTranslation;
use Illuminate\Http\Request;

class ProvinceTranslationController extends Controller
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
        $translations = ProvinceTranslation::all();

        return ProvinceTranslationResource::collection($translations);
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
            'province_id' => 'required|min:1',
            'language_id' => 'required|min:1'
        ]);

        ProvinceTranslation::create($request->all());

        return response(['success' => 'Province translation stored successfully...'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ProvinceTranslation  $provinceTranslation
     * @return \Illuminate\Http\Response
     */
    public function show(ProvinceTranslation $provinceTranslation)
    {
        return new ProvinceTranslationResource($provinceTranslation);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\ProvinceTranslation  $provinceTranslation
     * @return \Illuminate\Http\Response
     */
    public function edit(ProvinceTranslation $provinceTranslation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ProvinceTranslation  $provinceTranslation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProvinceTranslation $provinceTranslation)
    {
        $provinceTranslation->update($request->all());

        return response(['success' => 'Province Translation updated successfully...'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ProvinceTranslation  $provinceTranslation
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProvinceTranslation $provinceTranslation)
    {
        $provinceTranslation->delete();

        return response(['success' => 'Province Translation deleted successfully'], 204);
    }
}
