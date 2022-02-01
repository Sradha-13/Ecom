import React from 'react'
import { Link } from 'react-router-dom';


const Nav = () => {

  function logout(){
    localStorage.removeItem("users"); 
    localStorage.removeItem("tokens");
  }
    return (
    <>
      <nav className="navbar navbar-expand-lg navbar-primary bg-dark">
  <Link className="navbar-brand" to="#">Navbar</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    {

      localStorage.getItem("users") ?
      <>
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item active">
          <Link className="nav-link" to="/Cart"><i class="fa fa-shopping-cart"></i> MyCart </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="#">Order</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link " to="/Login" onClick={logout}>Logout</Link>
        </li>
      </>
      :
      <>
        <li className="nav-item active">
          <Link className="nav-link" to="/Login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Register">Register</Link>
        </li>
      </>
    }
    </ul>
  </div>
</nav>
    </>
    )
}

export default Nav;