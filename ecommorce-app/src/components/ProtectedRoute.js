import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from './Login';
 
function ProtectedRoute() {
    
    const isAuthenticated = localStorage.getItem("users");
    
    return isAuthenticated ? <Outlet/> : < Login />

};

export default ProtectedRoute;
