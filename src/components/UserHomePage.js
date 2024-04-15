import React, { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseContext';
function UserHomePage() {
  const navigate=useNavigate();
  const firebase = useFirebase();
  const [userData, setUserData] = useState([]);
  const handleDelete=(id)=>{
  const confirmed=window.confirm('Are you sure you want to delete this user?');
  if(!confirmed){
return;
  }else{
    firebase.deleteUserByID(id).then(()=>{
      alert('User data have been deleted ');
      fetchData();
    })
  }
  }
  // const handleView=(id)=>{
  //   navigate(`/HomePage/UserHomePageUserProfile/${id}`);
  // }
  const fetchData = async () => {
    const usersSnapshot = await firebase.getAllUsers();
    const Users = usersSnapshot.docs.map(doc =>({
      id: doc.id,
      ...doc.data()
    }));
    console.log(Users);
    setUserData(Users);
  }
  useEffect(() => {
    fetchData();
    console.log(userData);
  }, []);
 
  return (
    <>

      <div className='col-12'>
        <div className='row justify-content-center align-items-center my-4'>
          <div style={{ justifyContent: "right", alignItems: "right", display: "flex", flexDirection: "row" }}>
            <Link className='btn btn-primary' type='button' to='/HomePage/AddUser'>Add User</Link>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user, index) => {
                return(
                <tr key={user.id}>
                  <th scope="row">{index+1}</th>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td> 
                  <td>{user.address}</td>
                  <td className='px-2'>
                    <a className='btn btn-sm btn-warning mx-2' title='View' onClick={e=>navigate(`/HomePage/UserProfile/${user.id}`)}><i class="fa-regular fa-eye mx-1"></i></a>
                    <a className='btn btn-sm btn-success mx-2' title='Edit' onClick={e=>navigate(`/HomePage/UpdateUsers/${user.id}`)}><i class="fa-regular fa-pen-to-square mx-1"></i></a>
                    <a className='btn btn-sm btn-danger mx-2' title='Delete' onClick={()=>handleDelete(user.id)}><i class="fa-solid fa-trash mx-1"></i></a>
                  </td>
                </tr>)
})}
            </tbody>
          </table>
        </div>
      </div>


    </>
  )
}

export default UserHomePage