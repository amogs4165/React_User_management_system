import React, { useContext } from 'react'
import './Header.css'
import Button from '@mui/material/Button';
import { ADMIN_TOKEN, TOKEN } from '../../utility';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../App';


function Header({admin}) {
  const value = useContext(myContext)
  
  const setAdmin = value.setAdmin
  const setUser = value.setUser

  
  console.log(admin,"hhh")
  const logout = () =>{ localStorage.removeItem(TOKEN); setUser(null)}
  const adminLogout = () =>{ localStorage.removeItem(ADMIN_TOKEN);setAdmin(null)}
  const navigate = useNavigate()

  return (
    
    
    <>
      <div className='header'>
        <div className='flex-container'>
          <div>

            <h1>Welcome</h1>
          </div>
          <div>
            {admin && <Button style={{marginRight:'5px'}} onClick={() => navigate('/createUser')} variant="contained">Create User</Button>}
            <Button onClick={() => admin ?adminLogout() :logout()} variant="contained">Logout</Button>
          </div>

        </div>
      </div>
    </>
  )
}

export default Header