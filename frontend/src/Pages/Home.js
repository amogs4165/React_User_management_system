import React, { useEffect, useState } from 'react'
import Content from '../Components/Content/Content'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import axios from 'axios'

function Home() {

  return (
    <>
        <Header/>
        <Content/>
        <Footer/>
    </>
  )
}

export default Home