<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post("/reg",[UserController::class,"registration"]);
Route::get("/login",[UserController::class,"login"])->name('login');
Route::post("/login",[UserController::class,"login"]);
//Route::get("/get",[UserController::class,"getData"]);
Route::post("/insert",[UserController::class,"addData"]);
Route::post("/update",[UserController::class,"updateData"]);
Route::get("/find/{productname}",[UserController::class,"searchData"]);
Route::post("/addcart",[CartController::class,"addcart"]);
Route::get("/showcart",[CartController::class,"showcart"]);
Route::delete("/deleteCart/{id}",[CartController::class,"deleteCart"]);

Route::middleware('auth:api')->get("/get",[UserController::class,"getData"]);

