import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const navigate=useNavigate();
    const [error,setError]=useState(false);
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const handleLogin=(e)=>{
      debugger;
    e.preventDefault();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(user!=null){
      navigate('/Homepage');
    }
    console.log(user);
    // ...
  })
  .catch((error) => {
   setError(true);
   alert('Please enter the correct credentials');
  });
    }
  return (
    <div>
        <section className="vh-100">
  <div className="container-fluid h-custom" >
    <div className="row d-flex justify-content-center align-items-center vh-100" style={{top:"50%",left:"50%"}}>
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleLogin}>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>

        
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem",paddingRight:" 2.5rem"}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
            <Link  className="link-danger" to='/Register'>Register</Link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
    </div>
  )
}

export default Login