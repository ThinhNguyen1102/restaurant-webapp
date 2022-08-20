<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  public function register(Request $request) {

    $fields = $request->validate([
        'name' => 'required|string',
        'email' => 'required|string|unique:users,email',
        'password' => 'required|string|confirmed|min:5'
    ]);

    $user = User::create([
        'name' => $fields['name'],
        'email' => $fields['email'],
        'password' => bcrypt($fields['password'])
    ]);

    $response = [
        'message'=> "User created.",
        'success' => true,
        'user' => $user,
    ];

    return response($response, 201);
  } 

  public function login(Request $request) {
    // simple validation
    $fields = $request->validate([
      'email' => 'required|string:users,email',
      'password' => 'required|string|min:5'
    ]);

    $user = User::where('email', $request->email)->first();

    if(!$user) {
      return response([
          'message' => 'A user with email could not be found!',
          'success' => false
      ], 401);
    }

    if (!Hash::check($request->password, $user->password)) {
      return response([
        'message' => 'Wrong password!',
        'success' => false
      ], 401);
    }

    $token = $user->createToken('thinhtheblues')->plainTextToken;
    
    $response = [
        'message' => 'Login successfully.',
        'success' => true,
        'userId' => $user->id,
        'userName' => $user->name,
        'token' => $token
    ];

    return response($response, 201);
  }
}