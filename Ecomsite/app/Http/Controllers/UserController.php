<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Ecom;
use Validator;

class UserController extends Controller
{
    function registration(Request $request){

        $validator=Validator::make($request->all(),
        [   
            'name'=>"required",
            'email'=>"required|email",
            'password'=>"required",
            'c_password'=>"required|same:password",
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),202);
        }
        $alldata=$request->all();
        $alldata['password']=bcrypt($alldata['password']);

        $user=User::create($alldata);
        
        $data=[];
        $data['token']=$user->createToken('ecom-app')->accessToken;
        $data['name']=$user->name;

        return response()->json($data,200);
    }
    function login(Request $request){
        if(Auth::attempt([
            'email'=>$request->email, 
            'password' =>$request->password
        ])){
            $user=Auth::user();
            $data=[];
            $data['token']=$user->createToken('ecom-app')->accessToken;
            $data['name']=$user->name;
            $data['id']=$user->id;
            return response()->json($data,200);
        }else{
            return response()->json(["error"=>"Unauthorized Access"],203);
        }
    }
    function getData(){

        return Ecom::all();
    }
    function addData(Request $request){

        $validator=Validator::make($request->all(),
        [   
            'productname'=>"required",
            'productId'=>"required",
            'productImage'=>"required",
            'productPrice'=>"required",
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),202);
        }
        // $image=$request->file('productImage');
        // $imageName=time().'.'.$image->getClientOriginalName();;  
        // $image->move(public_path('uploads/images'), $imageName);

        $ecom=Ecom::create([
            'productname'=>$request->productname,
            'productId'=>$request->productId,
            'productImage'=>$request->file('productImage')->store('images'),
            'productPrice'=>$request->productPrice,
        ]);
        return response()->json($ecom,200);
    }
    function updateData(Request $request){
        
        $ecom=Ecom::where('id',$request->id)->update([
            'productname'=>$request->productname,
            'productId'=>$request->productId,
            'productImage'=>$request->file('productImage')->store('images'),
            'productPrice'=>$request->productPrice,
        ]);
        if($ecom){
            return ["Result"=>"Post has been Updated..."];
        }
        else{
            return["Result"=>"No Post Updated.... "];
        }
    }
    function searchData(Request $request,$productname){
        $ecom = Ecom::where('productname', 'like', '%'.$productname.'%')->get();
        if(count($ecom)){
            return $ecom;
        } else {
            return ['Result'=>'No records found'];
        }
    }
}
