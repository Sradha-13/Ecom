<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Cart;
use App\Models\Ecom;
use App\Models\User;

class CartController extends Controller
{
    function addcart(Request $request){
        ///return $request->all();
        $cart=Cart::create([
            'productId'=>$request->productId,
            'user_id'=>$request->user_id,
        ]);
        if ($cart){
            return ["Result" => "Added to cart.."];
        }
        else{

            return ["Result" => "No cart added.."];
        }
    }
    function showcart(Request $request){

        ///$id=$request->id;
        //$users=Ecom::select('users.id','productId')->join('users','users.id','ecoms.productId')->where("users.id",$id)->get();
        // dd($users);
        // $user_id=Auth::user()->id;
         $cartitems=Cart::with('product')->get();
         return ['carts'=>$cartitems];
        // return User::find(1)->product;
    }

    function deleteCart(Request $request,$id){
        $cart=Cart::where('id',$id)->delete();
        if($cart){
            return ["Result"=>"Post has been Deleted..."];
        }
    }
}
