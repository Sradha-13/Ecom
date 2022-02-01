import React from 'react';
import { useState,useEffect} from 'react';
//import { useCart } from "react-use-cart";
import axios from 'axios';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
    const [data,setData]=useState([]);
    const [product,setProduct]=useState([]);


    useEffect(() => {
        getAllData();
    },[])

    const navigate=useNavigate();
    

    const tokendata=localStorage.getItem("tokens")
    const userdata=localStorage.getItem("users");
    const userId=localStorage.getItem("id");

    let axiosConfig={
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${tokendata}`
        }
      };

    async function getAllData() {
        try {
         const result = await axios.get("http://127.0.0.1:8000/api/get",axiosConfig)
         setData(result.data);
        } catch (error) {
         alert("Unauthorized Access...");
        }
    }


    function submitToCart(id){
        const product={
            user_id:userId,
            productId:id
        }
       console.log(product);

        axios.post("http://127.0.0.1:8000/api/addcart",product).then(result=>{
            console.log(result.data);
            navigate("/Cart")
        }).catch((error)=>{
        console.log("wronggggggg");
      })
    }

  return (
            <section className="py-4 container">
            <Nav />
            <h1 align="center">Products</h1>
            <h2 align="left" style={{color:"lime"}}>Welcome Home:{userdata}</h2>
            <div className='row justify-content-center'>
            {data
                .map((user) => (
            <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4" key={user.id}>
            <div className="card p-0 overflow-hidden h-100 shadow" >
            <img src={`http://127.0.0.1:8000/${user.productImage}`} className="card-img-top img-fluid" alt="Image"/>
            <div className="card-body">
                <h5 className="card-title">{user.productId}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{user.productname}</li>
                <li className="list-group-item">{user.productPrice}</li>
            </ul>
            <div className="card-body">
                <button type="button"className="btn btn-danger"onClick={()=>submitToCart(user.id)}>Add to Cart</button>
            </div>
            </div>
            </div>
            ))}
            </div>
            </section>
       
        );
}



export default Home;
