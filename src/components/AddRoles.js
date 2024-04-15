import React, { useState } from 'react'
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';


function AddRoles() {
  const navigate=useNavigate();
  const firebase=useFirebase();
  const [RoleName,setRoleName]=useState('');
  const createRole=async()=>{
    await firebase.addRole(RoleName).then(()=>{
      console.log('Successfully Added');
      navigate('/Homepage/RoleHomepage');
    })
  }
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
                            <a className='btn btn-sm btn-success' onClick={createRole}>Create</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddRoles