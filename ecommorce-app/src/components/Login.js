import React from 'react';
import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const[user,setUser]=useState({
    email:"",
    password:""
  })
  const[username,setusername]=useState([]);




 const navigate=useNavigate();

  const handleInput=(e)=>{
    setUser({
        ...user,
        [e.target.name]:e.target.value
    })
  }
  async function handleSubmit(e){
     e.preventDefault();

    const users={ username };

    if(user.email===""){
      alert("The Email Field is Empty...");
    }
    else if(user.password===""){
      alert("The Password Field is Empty...");
    }

    axios.post(`http://127.0.0.1:8000/api/login`,user)
    .then((result) => {
      let tokenFrom=result.data.token;
      console.log(tokenFrom);
      let userData=result.data.name;
      let userId=result.data.id;
      localStorage.setItem("tokens",tokenFrom);
      localStorage.setItem("users",userData);
      localStorage.setItem("id",userId);

      let axiosConfig={
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${tokenFrom}`
        }
      };
      axios.get(`http://127.0.0.1:8000/api/get`,axiosConfig)
      .then((result) => {
        navigate('/');
      }).catch((error)=>{
        console.log("wronggggggg");
      })
    })
    .catch((error)=>{
        console.log("wronggggggg");
    })
  }

  return (
    <>
    <div className="container">
    <Nav/>
    <h3 align="center"> Login Here!!!! </h3><br />
    <div className='box'>
    <form style={{margin: "30px" }} method="POST" action=""onSubmit={handleSubmit}>
     <div className="form-group">
      <label>Enter Email</label>
      <input type="email" name="email" value={user.email} onChange={handleInput} className="form-control" />
     </div>
     <div className="form-group">
      <label>Enter Password</label>
      <input type="password" name="password" value={user.password} onChange={handleInput} className="form-control" />
     </div>
     <div className="form-group text-center">
      <input type="submit" name="login" className="btn btn-success" value="Login" />
     </div>
     <div className="text-center">
      Don't have an Account???
    <Link to="/Register">SignUp</Link>
    </div>
    </form>
   </div>
   </div>
   </>
  );
}

export default Login;
