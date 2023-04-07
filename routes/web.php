<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/*Route::get('/', function () {
    return to_route('restaurants.index');
});
*/
Route::get('/dashboard', function () {
    return to_route('restaurants.index');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
require __DIR__.'/auth.php';
Route::post("/dishes/filter",[\App\Http\Controllers\DishController::class, "filter"])->name("dishes.filter");
Route::post("/restaurants/filter",[\App\Http\Controllers\RestaurantController::class, "filter"])->name("restaurants.filter");
Route::resource("restaurants",\App\Http\Controllers\RestaurantController::class)->only(["index"]);
Route::resource("dishes",\App\Http\Controllers\DishController::class)->only(["index"]);


Route::get("/dishes/order/{field}/{dir}",[ \App\Http\Controllers\DishController::class,"order"])->name("dishes.order");
Route::middleware("edit")->group(function (){
    Route::resource("restaurants",\App\Http\Controllers\RestaurantController::class)->except(["index"]);
    Route::resource("dishes",\App\Http\Controllers\DishController::class)->except(["index"]);
});

