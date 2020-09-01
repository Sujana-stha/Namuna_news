<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProvinceResource;
use App\Province;
use Illuminate\Http\Request;

class ProvinceController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $provinces = Province::paginate(10);

        return ProvinceResource::collection($provinces);
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
            'slug'=>'required|unique:provinces',
            'display_status'=>'required|in:0,1'
        ]);

        Province::create([
            'slug'=>$request->slug,
            'display_status'=>$request->display_status,
            'order'=>Province::max('order')+1
        ]);

        return response(['success'=>'Province created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Province  $province
     * @return \Illuminate\Http\Response
     */
    public function show(Province $province)
    {
        return new ProvinceResource($province);
        // return response()->json($province);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Province  $province
     * @return \Illuminate\Http\Response
     */
    public function edit(Province $province)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Province  $province
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Province $province)
    {
        $province->update($request->all());

        return response(['success'=>'Province updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Province  $province
     * @return \Illuminate\Http\Response
     */
    public function destroy(Province $province)
    {
        $province->delete();

        return response(['success'=>'Province deleted successfully'], 204);
    }
}
