<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class DishController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $emfilter=new \stdClass();
        $emfilter->name="";
        $filter=$request->session()->get("dish_filter", $emfilter);
        $emorder=new \stdClass();
        $emorder->field="";
        $emorder->dir="";
        $order=$request->session()->get("dish_order", $emorder);

        return inertia("Dishes/Index",[
            'can'=>[
                'edit'=>Gate::allows("edit"),
            ],
            "dishes"=>Dish::filter($filter)->order($order)->with("restaurant")->get(),
            "filter"=>$filter,
            "order"=>$order,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Dishes/Create",[
           "restaurants"=>Restaurant::all(),
            //"dishes"=>Dish::with("restaurant")->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=>'required|min:3|max:32',
            'price'=>'required|min:1|max:32',
            'restaurant_id'=>'required|min:1|max:32'

        ]);
        $dish=new Dish();
        $dish->name=$request->name;
        $dish->price=$request->price;
        $dish->restaurant_id=$request->restaurant_id;
        if ($request->file("picture")!=null){
            $request->file("picture")->store("/public/dishes");
            $dish->picture=$request->file("picture")->hashName();
        }
        $dish->save();
        return to_route("dishes.index");

    }

    /**
     * Display the specified resource.
     */
    public function show(Dish $dish)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dish $dish)
    {
        return inertia("Dishes/Edit",[
           "dish"=>$dish,
           "restaurants"=>Restaurant::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Dish $dish)
    {
        $dish->name=$request->name;
        $dish->price=$request->price;
        $dish->restaurant_id=$request->restaurant_id;
        if ($request->file("picture")!=null){
            if ($dish->picture!=null){
                unlink(storage_path()."/app/public/dishes/".$dish->picture);
            }
            $request->file("picture")->store("/public/dishes");
            $dish->picture=$request->file("picture")->hashName();
        }
        $dish->save();
        return to_route("dishes.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Dish $dish)
    {
        $dish->delete();
        return to_route("dishes.index");
    }
    public function filter(Request $request){
        $filter=new \stdClass();
        $filter->name=$request->name;
        $request->session()->put("dish_filter", $filter);
        to_route("dishes.index");
    }
    public function order($field, $dir, Request $request){
        $order=new \stdClass();
        $order->field=$field;
        $order->dir=$dir;
        $request->session()->put("dish_order",$order);
        to_route("dishes.index");
    }
    public function addUser($id){
        return inertia("Dishes/AddUser",[
            "dish"=>Dish::where('id', $id)->with('users')->first(),
            "users"=>User::all()
        ]);
    }
    public function storeUser($id, Request $request){
        $dish=Dish::find($id);
        $dish->users()->detach($request->user_id);
        $dish->users()->attach($request->user_id);
        return to_route("dishes.addUser",$id);
    }
}
