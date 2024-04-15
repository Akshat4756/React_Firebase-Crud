import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';

function RoleHomepage() {
  const navigate=useNavigate();
  const firebase=useFirebase();
  const [Roles,setRoles]=useState([]);
  const fetchRoles=async()=>{
    const roleSnapShot=await firebase.getAllRoles();
    const roles=roleSnapShot.docs.map(doc=>({
      id:doc.id,
      ...doc.data()
  })

  );
  console.log(roles);
  setRoles(roles);
  //here what we are doing is directly returning the element by creating a object named user in which there are two field id and other data
  }
  const handleDelete=async(id)=>{
    const confirmed=window.confirm('Are u sure you want to delete this role?');
    if(!confirmed){
      return;
    }
    else{
      await firebase.deleteRole(id).then(()=>{
        alert('Role have been deleted');
        fetchRoles();
      })
    }
  }
  useEffect(()=>{
    fetchRoles();
  },[]);

  return (
    <div className='row justify-content-center align-items-center my-3'>
        <div style={{ justifyContent: "right", alignItems: "right", display: "flex", flexDirection: "row" }}>
            <Link className='btn btn-primary' type='button' to='/HomePage/AddRoles'>Add Roles</Link>
          </div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">RoleName</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {Roles.map((role,index)=>(
       <tr>
       <th scope="row">{index+1}</th>
       <td>{role.RoleName}</td>
       <td className='px-2'>
                     <a className='btn btn-sm btn-warning mx-2' title='View' onClick={e=>navigate(`/Homepage/RoleView/${role.id}`)}><i class="fa-regular fa-eye mx-1"></i></a>
                     <a className='btn btn-sm btn-success mx-2' title='Edit' onClick={e=>navigate(`/Homepage/UpdateRoles/${role.id}`)}><i class="fa-regular fa-pen-to-square mx-1"></i></a>
                     <a className='btn btn-sm btn-danger mx-2' title='Delete' onClick={e=>handleDelete(role.id)}><i class="fa-solid fa-trash mx-1"></i></a>
                   </td>
     </tr>
    ))}
   
  </tbody>
</table>
    </div>
  )
}

export default RoleHomepage