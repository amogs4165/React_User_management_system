import React, { useContext, useEffect } from 'react'
import './Header.css'
import Button from '@mui/material/Button';
import { ADMIN_TOKEN, TOKEN } from '../../utility';
import { useNavigate } from 'react-router-dom';
import { checkAdmin } from '../../Pages/Signup';


function Header({admin}) {
  const value = useContext(checkAdmin)
  console.log(admin,"hhh")
  const logout = () => localStorage.removeItem(TOKEN)
  const adminLogout = () => localStorage.removeItem(ADMIN_TOKEN)
  const navigate = useNavigate()

  return (
    
    
    <>
      <div className='header'>
        <div className='flex-container'>
          <div>

            <h1>Welcome</h1>
          </div>
          <div>
            {admin && <Button style={{marginRight:'5px'}} onClick={() => navigate('/signup')} variant="contained">Create User</Button>}
            <Button onClick={() => admin ?adminLogout() :logout()} variant="contained">Logout</Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Header