<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;
    public function dishes(){
        return  $this->hasMany(Dish::class);
    }
    public function scopeFilter(Builder $query, $filter){
        if ($filter->name!=null) {
            $query->where("name", "like", "%$filter->name%");
        }

    }
}
