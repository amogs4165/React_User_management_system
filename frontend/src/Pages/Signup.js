import React, { createContext } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Signup from '../Components/Signup/Signup'

export const checkAdmin = createContext()
function SignupPage({admin}) {

  if(admin) console.log("amdin turue");
  const adminStatus = admin ? true : false;
  const {userId} = useParams();
  console.log(adminStatus)
  return (
    <>
    <checkAdmin.Provider value={admin ? admin = true:admin = false}>
      {admin && <Header admin={true}/>}
        <Signup userID = {userId} />
      {admin && <Footer/>}
    </checkAdmin.Provider>
    </>
  )
}

export default SignupPage