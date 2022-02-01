<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;
    protected $table="carts";
    protected $fillable=["user_id","productId"];
    //public $timestamp=false;

    protected $with=['product'];

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function product()
    {
        return $this->belongsTo(Ecom::class,"productId");
    }
}