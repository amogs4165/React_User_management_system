import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import Adminlogin from "./Pages/AdminLogin";
import { ADMIN_TOKEN, TOKEN } from './utility'
import { createContext, useState } from "react";
import AdminHome from "./Pages/AdminHome";

export const myContext = createContext()

function App() {
  const [user, setUser] = useState(localStorage.getItem(TOKEN))
  const [admin, setAdmin] = useState(localStorage.getItem(ADMIN_TOKEN))

  return (
    <div className="App">

      <Router>
        <myContext.Provider value={{user:user,admin:admin,setAdmin:setAdmin,setUser:setUser}}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/login" element={!user?<LoginPage setUser={setUser} />: <Navigate to='/' />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/modify/:userId" element={<SignupPage admin={true}/>} />
          <Route path="/admin" element={admin?<Navigate to='/adminIndex'/>:<Adminlogin setAdmin={setAdmin}/>} />
          <Route path="/adminIndex" element={admin?<AdminHome/>:<Navigate to='/admin'/>} />
        </Routes>
        </myContext.Provider>
      </Router>
    </div>
  );
}

export default App;
