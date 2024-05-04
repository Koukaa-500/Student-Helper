import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./components/global.css";
import Users from "./components/profile/Users.jsx";
import SignUp from "./components/authentication/Signup.jsx";
import Login from "./components/authentication/Login.jsx";
import Home from "./components/home/Home.jsx";
import Chatbot from "./components/profile/Chatbot.jsx";
import OurServices from "./components/home/OurServices.jsx"
import Courses from "./components/home/Courses.jsx";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="user" 
            element={isAuthenticated ? <Users /> : <Navigate to="/login" />} 
          />
          <Route path="chatbot"
           element={isAuthenticated ? <Chatbot/> : <Navigate to = "/login"/>}/>
          <Route exact path="/" element={<Home />} />
          
          <Route path="ourservices" element ={<OurServices/>}/>
          <Route path="courses" element = {<Courses/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
