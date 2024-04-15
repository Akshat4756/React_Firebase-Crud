
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { useHref, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function UpdateUsers() {
    
    const params=useParams();
const navigate = useNavigate();
const fireBase = useFirebase();//getting the custom hook
const [fullName, setFullName] = useState("");
const [address, setAddress] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
    useEffect(()=>{
        fireBase.getUserDetailsbyID(params.id).then((value)=>{
            setFullName(value.data().fullName);
            setAddress(value.data().address);
            setPassword(value.data().password);
            setEmail(value.data().email);
        });
    },[])
   
    const UpdateUser=async(e)=>{
        if (!fullName || !address || !email || !password) {
            alert('Please enter the valid credentials');
        }
        try {
            await fireBase.updateUserbyId(params.id,fullName, address, email, password);
            alert('Data Updated');
            navigate('/Homepage');

        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

  
  return (
    <div>
        <div className='row justify-content-center align-items-center my-3'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <div className=" mb-3">
                        <label >Full name</label>
                            <input type="text" value={fullName} className="form-control"
                             onChange={e => setFullName(e.target.value)}  placeholder="Full Name" />
                            
                        </div>
                        <div className=" mb-3">
                        <label >Address</label>
                            <input type="text" value={address} onChange={e =>  setAddress(e.target.value) } className="form-control"  placeholder="" />
                           
                        </div>
                        <div className=" mb-3">
                        <label >Email address</label>
                            <input type="email" value={email} className="form-control" onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                            
                        </div>
                        <div className="">
                        <label for="floatingPassword">Password</label>
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} id="floatingPassword" placeholder="Password" />
                          
                        </div>
                        <div className='col-12 my-3' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <a className='btn btn-sm btn-success' onClick={UpdateUser}>Update</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateUsers