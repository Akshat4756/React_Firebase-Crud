import React from 'react'
import { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
function AddUser() {
    const navigate = useNavigate();
    const fireBase = useFirebase();//getting the custom hook
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = async () => {

        if (!fullName || !address || !email || !password) {
            alert('Please enter the valid credentials');
        }
        try {
            await fireBase.addUsers(fullName, address, email, password);
            navigate('/Homepage');

        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    }

    return (
        <div className='row justify-content-center align-items-center my-3'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-body'>
                        <div className="form-floating mb-3">
                            <input type="text" value={fullName} className="form-control"
                             onChange={e => setFullName(e.target.value)}  placeholder="Full Name" />
                            <label for="floatingInput">Full name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" value={address} onChange={e =>  setAddress(e.target.value) } className="form-control"  placeholder="" />
                            <label for="floatingInput">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" value={email} className="form-control" onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div className='col-12 my-3' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <a className='btn btn-sm btn-success' onClick={createUser}>Create</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser