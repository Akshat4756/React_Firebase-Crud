import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

function RoleView() {
  const [RoleName,setRoleName]=useState();
  const firebase=useFirebase();
  const params=useParams();

  console.log(params.id);
  const fetchRolebyID=async(id)=>{
await firebase.getRolebyID(id).then((value)=>(
  setRoleName(value.data().RoleName)
))

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
                             disabled   placeholder="Role Name" />
                            <label for="floatingInput">Role name</label>
                        </div>
                        {/* <div className='col-12 my-3' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <a className='btn btn-sm btn-success' onClick={createRole}>Create</a>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RoleView