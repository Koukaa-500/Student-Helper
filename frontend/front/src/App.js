import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./components/global.css";
import Users from "./components/profile/Users.jsx"
import SignUp from "./components/authentication/Signup.jsx";
import Login from "./components/authentication/Login.jsx";
import Home from "./components/home/Home.jsx";
import React from 'react'
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="signup" element={<SignUp/>} />
          <Route path="login" element={<Login/>} />
          <Route path="user" element= {<Users />}/>
          <Route path="home" element= {<Home />}/>
        </Routes> 
      </Router>
    </div>
    
  );
}

export default App;
