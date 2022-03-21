import React from 'react'
import Content from '../Components/Content/Content'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import admin from '../Components/Content/Admin'
import Admin from '../Components/Content/Admin'


function AdminHome() {
  return (
    <>
     
        <Header admin = {true} /> 
        <Admin /> 
        <Footer /> 

    </>
  )
}

export default AdminHome
