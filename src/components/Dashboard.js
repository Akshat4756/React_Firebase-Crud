import React, { useEffect, useState } from 'react'
import Card from './Card';
import { useFirebase } from '../context/FirebaseContext';
function Dashboard() {
  const [totalUser,setTotalUsers]=useState(null);
  const [totalRoles,setTotalRoles]=useState(null);
const firebase=useFirebase();
  useEffect(()=>{
    firebase.getAllUsers().then((value)=>{
      console.log(value.docs.length);
      setTotalUsers(value.docs.length);
    });
    firebase.getAllRoles().then((value)=>{
      console.log(value.docs.length);
      setTotalRoles(value.docs.length);
    })
  },[])
  return (
    <div>
      <h1 className='text-center'>Hi ! Welcome To Dashboard</h1>
      <div className='col-md-12 my-5'>
      <div className='row justify-content-center align-items-center text-center'>
        
          <div className='col-md-6 '>
          <Card title='Total Number of Users' description={totalUser}/>
          </div>
          <div className='col-md-6'>
          <Card title='Total Number of Roles' description={totalRoles}/>
            </div>
      </div>
    </div>
    </div>
  )
}

export default Dashboard