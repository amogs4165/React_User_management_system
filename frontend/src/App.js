import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import Adminlogin from "./Pages/AdminLogin";
import { TOKEN } from './utility'
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(localStorage.getItem(TOKEN))


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to='/login' />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<Adminlogin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
