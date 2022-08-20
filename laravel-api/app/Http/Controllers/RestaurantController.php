<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $result = Restaurant::paginate(6);
      $response = [
        'message' => 'get all restaurant successfully',
        'success' => true,
        'result' => $result,
      ];
      return response($response, 200);
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
        'name' => ['required', 'max:100', 'min:3'],
        'address' => ['required','max:255', 'min:10'],
        'introduction' => ['required', 'max:500'],
      ]);

      $hashedTooken = $request->bearerToken();
      $token = PersonalAccessToken::findToken($hashedTooken);
      $user = $token->tokenable;
      
      
      $newRestaurant = new Restaurant();
      $newRestaurant->name = $request->input('name');
      $newRestaurant->address = $request->input('address');
      $newRestaurant->introduction = $request->input('introduction');
      $newRestaurant->userId = $user->id;
      $newRestaurant->userName = $user->name;

      if($request->hasFile('image')) {
        $path = $request->file('image')->store('public/restaurants');
        $image_path = env('APP_URL').':8000/'.'storage/'.substr($path, strlen('public/'));
        $newRestaurant->imageUrl = $image_path;
      }

      $newRestaurant->save();
      $response = [
        'message' => 'create restaurant successfully',
        'success' => true,
        'result' => $newRestaurant,
      ];
      return response($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $restaurant = Restaurant::find($id);

      if(!$restaurant) {
        return response([
          'message' => 'Could not find restaurant.',
          'success' => false,
        ], 404);
      }

      $response = [
        'message' => 'get restaurant successfully',
        'success' => true,
        'result' => $restaurant,
      ];
      return response($response, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $request->validate([
        'name' => ['required', 'max:30', 'min:5'],
        'address' => ['required','max:255', 'min:10'],
        'introduction' => ['required', 'max:300'],
      ]);

      $hashedTooken = $request->bearerToken();
      $token = PersonalAccessToken::findToken($hashedTooken);
      $user = $token->tokenable;

      $restaurant = Restaurant::find($id);
      if (!$restaurant) {
        return response([
          'message' => 'Could not find restaurant.',
          'success' => false,
        ], 404);
      }

      if ($restaurant->userId != $user->id) {
        return response([
          'message' => 'no editing permission.',
          'success' => false,
        ], 403);
      }

      $image_path = '';
        if($request->hasFile('image')) {
            $path = $request->file('image')->store('public/restaurants');
            $image_path = env('APP_URL').':8000/'.'storage/'.substr($path, strlen('public/'));
        }

      $updateRestaurant = tap($restaurant)->update([
        'name' => $request->input('name'),
        'address' => $request->input('address'),
        'introduction' => $request->input('introduction'),
        'image' => $image_path,
      ]);

      $response = [
        'message' => 'update restaurant successfully',
        'success' => true,
        'result' => $updateRestaurant,
      ];
      return response($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
      $hashedTooken = $request->bearerToken();
      $token = PersonalAccessToken::findToken($hashedTooken);
      $user = $token->tokenable;

      $restaurant = Restaurant::find($id);
      if (!$restaurant) {
        return response([
          'message' => 'Could not find restaurant.',
          'success' => false,
        ], 404);
      }

      if ($restaurant->userId != $user->id) {
        return response([
          'message' => 'no editing permission.',
          'success' => false,
        ], 403);
      }
      
      $result = Restaurant::destroy($id);
      $response = [
        'message' => 'delete restaurant successfully',
        'success' => true,
        'result' => $result,
      ];
      return response($response, 200);
    }
}