import React, { useState,useEffect } from 'react'
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateRoles() {
  const navigate=useNavigate();
  const firebase=useFirebase();
  const params=useParams();
  const [RoleName,setRoleName]=useState();
  const fetchRolebyID=async(id)=>{
    await firebase.getRolebyID(id).then((value)=>(
      setRoleName(value.data().RoleName)
    ))
      }
      
  const updateRole=async()=>{
    if(!RoleName){
      alert('Please Enter the RoleName')
    }
    try{
      await firebase.updateRole(params.id,RoleName).then(()=>{
        alert('Role have been Updated');
        navigate('/Homepage/RoleHomepage');
      })
    }catch (error) {
      console.log(error);
      alert('Something went wrong');
  }
  }
  useEffect(()=>{
    fetchRolebyID(params.id);
  },[])
  return (
    <div>
      <div className='row justify-content-center align-items-center my-3'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <div className="form-floating mb-3">
                            <input type="text" value={RoleName} className="form-control"
                             onChange={e => setRoleName(e.target.value)}  placeholder="Role Name" />
                            <label for="floatingInput">Role name</label>
                        </div>
                       
                        <div className='col-12 my-3' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <a className='btn btn-sm btn-success' onClick={updateRole}>Update</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateRoles