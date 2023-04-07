<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Dish extends Model
{
    use HasFactory;

    public function users(){
        return  $this->belongsToMany(User::class);
    }
    public function restaurant(){
        return  $this->belongsTo(Restaurant::class);
    }
    public function scopeFilter(Builder $query, $filter){
        if ($filter->name!=null) {
            $query->where("name", "like", "%$filter->name%");
        }

    }
    public function scopeOrder(Builder $query, $order){
        if ($order->field!=null){
            if ($order->dir!=null){
                $query->orderBy($order->field, $order->dir);
            }else{
                $order->orderBy($order->field);
            }
        }
    }
}
