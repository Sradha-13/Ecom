import React from 'react';
import '../App.css';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './Nav';

function Register() {
    const[addData,setAddData]=useState({
        name:"",
        email:"",
        password:"",
        c_password:""
    });

    
    const navigate=useNavigate();

    const handleOnChange=(e)=>{
        setAddData({
            ...addData,
            [e.target.name]:e.target.value
        })
    }

    async function handleSubmit(e){
        e.preventDefault();
        try{
            await axios.post(`http://127.0.0.1:8000/api/reg`,addData);
        }catch(error){
            console.log("wronggggggg");
        } 
        console.log(addData);
        navigate('/Login');

    }    

  return (
    <>
    <div className="container">
    <Nav/>
    <h3 align="center"> RegisterForm </h3><br />
    <div className="box">
   <form style={{margin: "30px" }} method="post" onSubmit={handleSubmit}>
    <div className="form-group ">
     <label>Name:</label>
     <input type="text" name="name" className="form-control" value={addData.name} onChange={handleOnChange}/>
    </div>
    <div className="form-group">
     <label>EmailId:</label>
     <input type="email" name="email" className="form-control" value={addData.email} onChange={handleOnChange}/>
    </div>
    <div className="form-group">
     <label>Password:</label>
     <input type="password" name="password" className="form-control" value={addData.password} onChange={handleOnChange} />
    </div>
    <div className="form-group">
     <label>ConfirmPassword:</label>
     <input type="password" name="c_password" className="form-control"value={addData.c_password} onChange={handleOnChange}/>
    </div>
    <div className="form-group text-center">
     <input type="submit" name="Register" className="btn btn-primary" value="Register" />
    </div>
    <div className="text-center">
    Click here For Login....
    <Link to="/Login">Login</Link>
    </div>
   </form>
  </div>
  </div>
   </> 
  );
}

export default Register;
