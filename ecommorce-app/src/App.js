// import logo from './logo.svg';
//import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
//import {  useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProtectedRoute from "./components/ProtectedRoute";
import Cart from "./components/Cart";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

function App() {


 
  return (
    <Routes>
    <Route element={<ProtectedRoute />}>
      <Route path="/" element={<Home />}></Route>
      <Route path="Cart" element={<Cart />}></Route>
    </Route>
    <Route path="Login"element={<Login/>}>
    </Route>
    <Route path="Register" element={<Register/>}></Route>
    </Routes>
  );
}

export default App;
