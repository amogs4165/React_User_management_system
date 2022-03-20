import React from 'react'
import './Header.css'
import Button from '@mui/material/Button';
import { TOKEN } from '../../utility';
function Header() {
  const logout = ()=>  localStorage.removeItem(TOKEN)
  return (
    <>
    <div className='header'>
      <div className='flex-container'>
      <h1>Welcome</h1>
      <Button onClick={()=>logout()} variant="contained">Logout</Button>

      </div>
    </div>
    </>
  )
}

export default Header