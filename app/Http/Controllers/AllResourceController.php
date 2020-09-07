<?php

namespace App\Http\Controllers;

use App\AllResource;
use App\Http\Resources\MediaResource;
use App\VideoResource;
use Illuminate\Http\Request;

class AllResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $resources = AllResource::paginate(10);

        return MediaResource::collection($resources);
        // return response()->json($resources);
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
            'type' => 'required|in:file,video',
            'url'=> 'required',
            'status' => 'required|in:active,draft,hidden,deleted'
        ]);

        $resource = AllResource::create($request->all());

        if($request->type == 'video') {
            VideoResource::create([
                'resource_id'=>$resource->id,
                'order'=>VideoResource::max('order')+1,
                'views'=>$request->views
            ]);
        }

        return response(['success'=>'Resource stored successfully..'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AllResource  $allResource
     * @return \Illuminate\Http\Response
     */
    public function show(AllResource $resource)
    {
        return new MediaResource($resource);
        // return response()->json($resource);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\AllResource  $allResource
     * @return \Illuminate\Http\Response
     */
    public function edit(AllResource $allResource)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AllResource  $allResource
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AllResource $resource)
    {
        $resource->update($request->all());

        return response(['success'=>'Resource updated successfully'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AllResource  $allResource
     * @return \Illuminate\Http\Response
     */
    public function destroy(AllResource $resource)
    {
        $resource->delete();

        return response(['success'=>'Resource deleted successfully'], 204);
    }
}
