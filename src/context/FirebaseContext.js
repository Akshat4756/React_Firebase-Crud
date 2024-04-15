import { createContext, useContext } from "react";
import React from 'react'
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from 'firebase/database'//importing database to make a instance of  the database 
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);//getting the firebase app
const firebaseAuth = getAuth(firebaseApp);//passing it as parameter into getAuth function to get auth

const database = getDatabase(firebaseApp);//creating the instance of the realtime database
const db =getFirestore(firebaseApp);//get the firestore
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);//creating a custom hook

export const FirebaseProvider = (props) => {

  //to sign up
  const signUpWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };


  //method to signout
  const signOut=()=>{
    firebaseAuth.signOut().then(()=>{
      console.log('user signed out');
      alert('Sign Out Successfull');
    }).catch((error)=>{
      console.log(error);
    });
  }

  // method to add users 
  const addUsers = async (fullName, address, email, password) => {
    const docRef = await addDoc(collection(db, "users_Seperate"), {
      fullName: fullName,
      address: address,
      email: email,
      password: password
    })
    console.log('document written with id :', docRef.id);
    alert('Users have been added');
  }
//method to put data into a database 
  const putData = (key, data) => set(ref(database, key), data);
//method to get all data from database 
const getAllUsers=async()=>{
  const querySnapshot =  getDocs(collection(db,"users_Seperate"));
return querySnapshot;
}
//method to get the data by id 
const getUserDetailsbyID=async(id)=>{
  const docRef=doc(db,"users_Seperate",id);
  const result=await getDoc(docRef);
  return result;
}
//method to update the data by id 
const updateUserbyId=async(id,fullName,email,address,password)=>{
  const userRef=doc(db,'users_Seperate',id);
  await updateDoc(userRef,{
    fullName:fullName,
    email:email,
    address:address,
    password:password
  })
}
//method to delete the user by id 
const deleteUserByID=async(id)=>{
  const userRef=doc(db,'users_Seperate',id);
  await deleteDoc(userRef);
}
//method to add the Role
const addRole=async(RoleName)=>{
const roleRef=await addDoc(collection(db,"roles"),{
  RoleName:RoleName
})
console.log('document written with id :', roleRef.id);
alert('Role have been added');
}
//method to get all the roles
const getAllRoles=async()=>{
  return getDocs(collection(db,'roles'));
}
//method to update the roles
const updateRole=async(id,RoleName)=>{
const roleRef=doc(db,'roles',id);
await updateDoc(roleRef,{
  RoleName:RoleName
})
}
//method to get the role by id
const getRolebyID=async(id)=>{
  const roleRef=doc(db,'roles',id);
  return await getDoc(roleRef);
}
//method to delete the roles
const deleteRole=async(id)=>{
const roleRef=doc(db,'roles',id);
await deleteDoc(roleRef);
}
  return (
    <FirebaseContext.Provider value={{ signUpWithEmailAndPassword, putData , addUsers,signOut, 
    getAllUsers,getUserDetailsbyID,updateUserbyId,deleteUserByID,addRole, getAllRoles,getRolebyID,updateRole,deleteRole}}>
      {props.children}
    </FirebaseContext.Provider>
  )
}

export default FirebaseContext
