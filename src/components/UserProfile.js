import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/FirebaseContext';
import { useParams } from 'react-router-dom'
function UserProfile() {
    const [data,setData]=useState([]);
    const firebase=useFirebase();
    const params=useParams();
    console.log(params.id);
    useEffect(()=>{
        firebase.getUserDetailsbyID(params.id).then((value)=>setData(value.data()));
        console.log(data);
    },[])
  return (
    <div className='row justify-content-center align-items-center'>
        <div className='col-md-6'>
            <div className='card'>
                <div className='card-body'>
                    <label className='form-label'>Name</label>
                    <input type='text' value={data.fullName} disabled className='form-control form-control-sm'/>
                    <label className='form-label'>Email</label>
                    <input type='text' value={data.email} disabled className='form-control form-control-sm'/>
                    <label className='form-label'>Address</label>
                    <input type='text' value={data.address} disabled className='form-control form-control-sm'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile