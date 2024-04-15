import React from 'react'
import {Link } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseContext'
import { useNavigate } from 'react-router-dom';
function Navbar() {
  const navigate=useNavigate();
  const firebase=useFirebase();
  const handleLogout=async()=>{
    await firebase.signOut();
      navigate('/');
  }
  return (
    <>
 <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to=''>Dashboard</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to='/Homepage'>Home</Link>
        </li>
       
        <li className="nav-item">
        <Link className="nav-link" to='UserHomePage'>Users</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to='RoleHomepage'>Roles</Link>
        </li>
      </ul>
      <label className='navbar-nav'>
    
      </label>
      <ul className='navbar-nav ms-auto '>
        <a className='nav-link' onClick={handleLogout}>Log out</a>
      </ul>
    </div>
  </div>
</nav>
    </>
  
  )
}

export default Navbar