<?php

namespace App\Http\Controllers;

use App\NewsSubscriber;
use Illuminate\Http\Request;

class NewsSubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subscribers = NewsSubscriber::paginate(10);

        return $subscribers;
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
            'email'=>'required|email'
        ]);

        NewsSubscriber::create([
            'email'=>$request->email
        ]);

        return response(['Subscribed to news portal successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\NewsSubscriber  $newsSubscriber
     * @return \Illuminate\Http\Response
     */
    public function show(NewsSubscriber $newsSubscriber)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\NewsSubscriber  $newsSubscriber
     * @return \Illuminate\Http\Response
     */
    public function edit(NewsSubscriber $newsSubscriber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\NewsSubscriber  $newsSubscriber
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, NewsSubscriber $newsSubscriber)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\NewsSubscriber  $newsSubscriber
     * @return \Illuminate\Http\Response
     */
    public function destroy(NewsSubscriber $newsSubscriber)
    {
        $newsSubscriber->delete();

        return response(['Subscriber deleted successfully'], 204);
    }
}
