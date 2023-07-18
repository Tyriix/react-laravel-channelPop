<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Log;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Channel::select('id', 'channelName', 'population')->get();
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
            Channel::create($request->post());
            return response()->json([
                'message'=>'Channel has been created.'
            ]);
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'An error occurred. Channel not created.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Channel $channel)
    {
        return response()->json([
            'channel'=>$channel
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Channel $channel)
    {
        $request->validate([
            'channelName'=>'required',
            'population'=>'required'
        ]);

        try{
            $channel->fill($request->post())->update();
            $channel->save();

            return response()->json([
                'message'=>'Channel has been updated.'
            ]);
        }
        catch(\Exception $e)
        {
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'An error occurred. Channel not updated.'
            ],500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Channel $channel)
    {
        try{
            $channel->delete();
            return response()->json([
                'message'=>'Channel has been deleted.'
            ],200);
        }
        catch(\Exception $e){
            Log::error($e->getMessage());
            return response()->json([
                'message'=>'An error occurred. Channel not deleted.'
            ],500);
        }
    }
}
