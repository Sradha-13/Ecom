import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom'; 
import { useState, useEffect} from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';

function Cart() {

   const[quantity,setQuantity]=useState(1);
     const[cart,setCart]=useState([]);
 
    // const{id}=useParams();
  
  function handleDecreament(){
    setQuantity(prevCount=>prevCount-1);
  }
  function handleIncreament(){
    setQuantity(prevCount=>prevCount+1);
  }

  async function deleteCart(id){
      await axios.delete(`http://127.0.0.1:8000/api/deleteCart/${id}`);
      var newdata = cart.filter((item) => {
      return item.id !== id;
      })
      setCart(newdata);
  }
  

  useEffect(() => {
    getAllData();
  },[]);
  
  async function getAllData() {
    try {
     const result = await axios.get(`http://127.0.0.1:8000/api/showcart`)
     console.log(result.data.carts)
     setCart(result.data.carts);
    } catch (error) {
     console.log("Somthing went Wrong");
    }
}


   
  return (
    <section className="py-4 container">
    <Nav />
    <h1 className="text-center">Cart Page</h1>
    <div className="row">
        <table className="table table-success table-striped">
            <thead>
            <tr>
                <th width="10%">Image</th>
                <th width="30%">Product</th>
                <th width="10%">Price</th>
                <th width="8%">Quantity</th>
                <th width="15%">Sub Total</th>
                <th width="8%">Remove</th>
            </tr>
            </thead>
            <tbody>
            {cart.map((user) => (
             <tr>
                <th><img src={`http://127.0.0.1:8000/${user.product.productImage}`}alt="" width="50px" height="50px"/></th>
                <th scope="row">{user.product.productname}</th>
                <td>{user.product.productPrice}</td>
                <td><div className="quantity">
                    <Link to="#" class="quantity__minus"onClick={handleDecreament}><span>-</span></Link>
                    <input name="quantity" type="text" class="quantity__input" value={quantity}/>
                    <Link to='#' class="quantity__plus"onClick={handleIncreament}><span>+</span></Link>
                  </div></td>
                <td>{user.product.productPrice } * {quantity}</td>
                <td>
                <button className="btn btn-danger" onClick={()=>deleteCart(user.id)}><i class="far fa-trash-alt" style={{color:"black"}}></i></button>
                </td>
              </tr>
            ))}
            </tbody> 
        </table>
        <div class="row align-items-end">
          <div class="col">
          </div>
          <div class="col">
          </div>
          <div class="col">
          </div>
          <div className='col'>
          <div className='fs-3 text-success'>Total item:{cart.length}</div>
          <button type="submit" className='btn btn-info'>Payment</button>
            </div>
        </div>
    </div>
</section>
  );
}

export default Cart;
