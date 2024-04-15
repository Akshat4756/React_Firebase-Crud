import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import UserHomePage from './UserHomePage'
import RoleHomepage from './RoleHomepage'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard'
import AddUser from './AddUser'
import AddRoles from './AddRoles'
import UserProfile from './UserProfile'
import RoleView from './RoleView'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import Login from './Login'
import UpdateUsers from './UpdateUsers'
import UpdateRoles from './UpdateRoles'

function Homepage() {
 
  const [user,setUser]=useState(null);
const navigate=useNavigate();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user);
const userId=user.uid;

      }else{
        setUser(null);
        navigate('/');
console.log('LoggedOut');
      }
    })
  },[]);
  if(user===null){
   <Login/>
  }else{
    return (
      <>
        <Navbar />
        <div className='row justify-content-center align-items-center my-4'>
          <Routes>
            <Route exact path='/' Component={Dashboard} />
            <Route path='/UserHomePage' Component={UserHomePage} />
            <Route path='/RoleHomepage' Component={RoleHomepage} />
            <Route path='/AddUser' Component={AddUser} />
            <Route path='/AddRoles' Component={AddRoles} />
            <Route path='/UserProfile/:id' Component={UserProfile} />
            <Route path='/RoleView/:id' Component={RoleView} />
            <Route path='/UpdateUsers/:id' Component={UpdateUsers}/>
            <Route path='/UpdateRoles/:id' Component={UpdateRoles}/>
          </Routes>
        </div>
  
        <Footer />
      </>
    )
  }
 
}

export default Homepage