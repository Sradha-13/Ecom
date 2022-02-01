<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Ecom extends Model
{
    use HasFactory;
    protected $table='ecoms';  
    protected $fillable=["productname","productId","productImage","productPrice"];
    public $timestamps=false;

    public function product()
    {
        return $this->hasOne(Cart::class,"productId");
    }
}
