<?php

namespace App\Http\Controllers;

use App\Models\ChannelPop;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ChannelPopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ChannelPop::select('id', 'channelName', 'population')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'channelName'=>'required',
            'population'=>'required'
        ]);

        try{
            ChannelPop::create($request->post());
            return response()->json([
                'message'=>'Channel has been created.'
            ]);
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'An error occured. Channel not created.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(ChannelPop $channelPop)
    {
        return response()->json([
            'channelPop'=>$channelPop
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ChannelPop $channelPop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ChannelPop $channelPop)
    {
        $request->validate([
            'channelName'=>'required',
            'population'=>'required'
        ]);

        try{
            $channelPop->fill($request->post())->update();
            $channelPop->save();

            return response()->json([
                'message'=>'ChannelPop has been updated.'
            ]);
        }
        catch(\Exception $e)
        {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'An error occured. Channel not updated.'
            ],500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChannelPop $channelPop)
    {
        try{
            $channelPop->delete();
            return response()->json([
                'message'=>'ChannelPop has been deleted.'
            ],500);
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'An error occured. Channel not deleted.'
            ],500);
        }
    }
}
