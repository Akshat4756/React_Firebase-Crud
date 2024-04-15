import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

function Register() {
  const firebase=useFirebase();
  const [email,SetEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();


  const handleSubmit=(e)=>{
e.preventDefault();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     // ...
//     if(user!=null){
//       alert('Registration Successfull');
//       navigate('/');
//     }
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     alert('Something went wrong');
//     // ..
//   });

firebase.signUpWithEmailAndPassword(email,password);
firebase.putData('users/'+"akshat",{email,password}).then(()=>{
  alert('Registration successfull! Please login in order to access the application');
  navigate('/');
});
  }
 
  return (
    <>
    <section className="vh-100">
    <div className="container-fluid h-custom" >
      <div className="row d-flex justify-content-center align-items-center vh-100" style={{top:"50%",left:"50%"}}>
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
            className="img-fluid" alt="Sample image"/>
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form onSubmit={handleSubmit}>
            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" value={email} onChange={e=>SetEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg"
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
                style={{paddingLeft: "2.5rem",paddingRight:" 2.5rem"}}>Register</button>
              <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? 
              <Link  className="link-danger" to='/'>Login</Link></p>
            </div>
  
          </form>
        </div>
      </div>
    </div>
    
  </section>
  </>
    // <div className='row justify-content-center align-items-center'>
    //   <div className='col-md-6'>
    //     <div className='card'>
    //       <div className='card-body'>
    //         <form onSubmit={handleSubmit}>
    //         <div className='row'>
    //         <label className='form-label' htmlFor='txtEmail'>Email</label>
    //           <input className='form-control form-control-sm' onChange={e=>SetEmail(e.target.value)} id='txtEmail' type='email' value={email} placeholder='Please enter your email id '/>
              
    //         </div>
    //         <div className='row'>
    //         <label className='form-label' htmlFor='txtPassword'>Password</label>
    //           <input className='form-control form-control-sm' onChange={e=>setPassword(e.target.value)} id='txtPassword' type='Password' value={password} placeholder='Please enter your password '/>
           
    //         </div>
    //         <div className='col-md-12 my-5'>
    //           <button className='btn btn-success btn-sm float-start' type='submit'>Register</button>
    //           <Link className='btn btn-danger btn-sm float-end' to='/'>Login</Link>
    //         </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Register