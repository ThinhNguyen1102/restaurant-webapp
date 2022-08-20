<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('cors')->group(function(){
  Route::post('/auth/register', [AuthController::class, 'register']);
  Route::post('/auth/login', [AuthController::class, 'login']);
  Route::get('/restaurants', [RestaurantController::class, 'index']);
  Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
  
  Route::group(['middleware' => ['auth:sanctum']], function(){
    Route::post('/restaurants', [RestaurantController::class, 'store']);
    Route::post('/restaurants/{id}', [RestaurantController::class, 'update']);
    Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);
  });
  
  Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
      return $request->user();
  });
});