<?php

use App\Http\Controllers\Auth\ChangePasswordController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\MeController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', LoginController::class)->name('login');
Route::post('/register', RegisterController::class)->name('register');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('/logout', LogoutController::class);
    Route::get('/me', MeController::class);
    Route::post('/change_password', ChangePasswordController::class);

    // Profiles
    Route::apiResource('profiles', ProfileController::class);
    Route::get('/profiles/search/{search}', [ProfileController::class, 'search']);
    Route::resource('profiles', ProfileController::class)->except([
        'create',
        'store'
    ]);

    // Posts
    Route::post('/posts/like_post/{post}', [PostController::class, 'likePost']);
    Route::resource('posts', PostController::class)->only([
        'index',
        'show',
        'store',
        'destroy'
    ]);
});
