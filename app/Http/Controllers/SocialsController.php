<?php

namespace App\Http\Controllers;

use App\Socials;
use Illuminate\Http\Request;

class SocialsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $socials = Socials::all();

        return response()->json($socials);
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
            'title'=>'required|unique:socials',
            'icon_class'=>'required',
            'link' => 'required|url'
        ]);

        Socials::create([
            'title' => $request->title,
            'icon_class' => $request->title,
            'link' => $request->link,
            'order' => Socials::max('order') + 1
        ]);

        return response(['success'=>'Social stored successfully...'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Socials  $socials
     * @return \Illuminate\Http\Response
     */
    public function show(Socials $social)
    {
        return response()->json($social);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Socials  $socials
     * @return \Illuminate\Http\Response
     */
    public function edit(Socials $social)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Socials  $socials
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Socials $social)
    {
        $social->update([
            'title' => $request->title,
            'icon_class' => $request->title,
            'link' => $request->link,
            'order' => $request->order
        ]);

        return response(['success'=>'Social updated successfully...'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Socials  $socials
     * @return \Illuminate\Http\Response
     */
    public function destroy(Socials $social)
    {
        $social->delete();

        return response(['success' => 'Social deleted successfully'], 204);
    }
}
