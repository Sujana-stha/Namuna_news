<?php

namespace App\Http\Controllers;

use App\CategorySubscriber;
use App\Http\Resources\SubscriberResponse;
use App\Subscriber;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subscribers = Subscriber::all();

        // return response()->json($subscribers);
        return SubscriberResponse::collection($subscribers);
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
        // return ($request->category_id);
        $request->validate([
            'email'=>'required|email',
        ]);

        $subscriber = Subscriber::create([
            'email' => $request->email,
            'category_id' => $request->category_id,
            'preference' => $request->preference
        ]);

        foreach($request->category_id as $cat_id) {
            CategorySubscriber::create([
                'category_id'=>$cat_id,
                'subscriber_id'=>$subscriber->id
            ]);
        }

        return response(['success'=>'Subscriber added to category successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function show(Subscriber $subscriber)
    {
        return new SubscriberResponse($subscriber);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function edit(Subscriber $subscriber)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subscriber $subscriber)
    {
        if($request->preference != "none") {
            $subscriber->update($request->all());

            foreach($request->category_id as $catSub) {
                $sub = CategorySubscriber::where('category_id', $catSub)->where('subscriber_id', $subscriber->id)->first();

                if($sub != null){
                    $sub->update([
                        'category_id'=>$catSub,
                        'subscriber_id'=>$subscriber->id
                    ]);
                } else {
                    CategorySubscriber::create([
                        'category_id'=>$catSub,
                        'subscriber_id'=>$subscriber->id
                    ]);
                }
            }
        } else {
            $subscriber->delete();
        }

        return response(['success'=>'Subscriber updated with category successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subscriber  $subscriber
     * @return \Illuminate\Http\Response
     */
    public function destroy(Subscriber $subscriber)
    {
        $subscriber->delete();

        return response(['success'=>'Subscriber Deleted Successfully'], 204);
    }
}
