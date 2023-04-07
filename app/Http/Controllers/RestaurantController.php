<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $emfilter=new \stdClass();
        $emfilter->name="";
        $filter=$request->session()->get("rest_filter", $emfilter);
        return inertia("Restaurants/Index",[
            'can'=>[
                'edit'=>Gate::allows("edit"),
            ],
            "restaurants"=>Restaurant::filter($filter)->get(),
            "dishes"=>Dish::all(),
            "filter"=>$filter,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Restaurants/Create",[
            "dishes"=>Dish::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3|max:32',
            'city'=>'required|min:3|max:32',
            'address'=>'required|min:3|max:32',
            'time'=>'required|min:3|max:32'
        ]);
        $restaurant=new Restaurant();
        $restaurant->name=$request->name;
        $restaurant->city=$request->city;
        $restaurant->address=$request->address;
        $restaurant->time=$request->time;
        $restaurant->save();
        return to_route("restaurants.index");
    }

    /**
     * Display the specified resource.
     */
    public function show(Restaurant $restaurant)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Restaurant $restaurant)
    {
        return inertia("Restaurants/Edit",[
           "restaurant"=>$restaurant
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Restaurant $restaurant)
    {
        $restaurant->name=$request->name;
        $restaurant->city=$request->city;
        $restaurant->address=$request->address;
        $restaurant->time=$request->time;
        $restaurant->save();
        return to_route("restaurants.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();
        return to_route("restaurants.index");
    }
    public function filter(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("rest_filter", $filter);
        to_route("restaurants.index");
    }
}
