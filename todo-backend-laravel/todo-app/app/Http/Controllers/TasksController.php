<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreTaskRequest;




class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return response()->json([
      'task' => Task::get(),
      ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {  
        try {
            $record = new Task( $request->task );
            $record->save();
            return response($record, 201);
            } catch (\Exception $e) {
            Log::error($e);
            /**in case that an error occurred before saving the new record we need to
            * rollback the id tp the current max id that we have before creating the
            * new record.
            **/
            DB::statement('ALTER TABLE tasks AUTO_INCREMENT=1');
            return response('Error', 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return response()->json([
      'task' => Task::findOrFail($id),
      ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\StoreTaskRequest $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreTaskRequest $request, $id)
    {
        $record = Task::findOrFail($id);
        try {
        $record->update($request->task);
        return response()->json([
        'task' => $record
        ]);
        } catch (\Exception $e) {
        Log::error($e);
        return response('Error', 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $record = Task::findOrFail($id);
        $temp_timestamp = $record->updated_at; //inorder to save the last time the record have been updated before the deletion.
        $result = $record->delete();
        if ($result) {
        $record['updated_at'] = $temp_timestamp; //returning the last time the record has been updated befor the deletion.
        $result = $record->save();
        }
        return response(204);
    }
}
