import React from 'react'
import Login from '../Components/Login/Login'

function LoginPage({setUser}) {
  return (
    <>
        <Login setUser={setUser}/>
    </>
  )
}

export default LoginPage