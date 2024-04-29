import React, { useState } from 'react';
import logo from "../../assets/logo.png";
import loginImage from "../../assets/loginImage.png";
import axios from 'axios'; // Import Axios for making HTTP requests
import "../global.css"
import { setAuthToken } from '../authentication/authService.js';
import { useNavigate ,Link} from 'react-router-dom';
import { Toaster, toast } from 'sonner';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState();
  const client = axios.create({
    baseURL:"http://127.0.0.1:8000"
  });
 
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  function submitLogin(e) {
    e.preventDefault();

     client.post("/accounts/login", { email: email, password: password })
        .then(function(res) {
            const { token, refreshToken } = res.data;

            // Store the token and refresh token in local storage
            setAuthToken(token, refreshToken);

            // Redirect to the user page
            
           toast.success('Login successful!', {
              duration: 5000,
               // Duration in milliseconds (3 seconds)
            });
            setTimeout(() => {
              // Redirect to the user page
              window.location.href = "/user";
            }, 1000);
            console.log(res.data);
        })
        .catch(function(error) {
          toast.error('User not registered. Please check your email.', {
            duration: 5000, // Duration in milliseconds (5 seconds)
          });
        });
}



  return (
    <>
    <Toaster position="top-center" richColors  />
      <div className="no-scroll">
        
          <div className="rectangle">
            
            
              <img
                style={{
                  width: "150",
                  height: "150",
                  borderRadius: "13",
                  marginLeft:"5%"
                }}
                src={logo}
                alt=""
              />
            
            
          </div>
        
        <div className="container">
          <div className="row">
            <div className="boxn">
              <div className="boxn-body">
                <div className="row">
                  <div style={{ marginLeft: "50px", marginTop: "50px" }}>
                    <h2>WELCOME TO </h2>
                  </div>
                  <div style={{ marginLeft: "150px" }}>
                    <h2
                      style={{
                        color: "#4D2C5E",
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      STUDENT HELPER
                    </h2>
                  </div>
                </div>
                <div style={{ marginLeft: "100px" }}>
                  <img
                    style={{
                      width: 250,
                      height: 280,
                      borderRadius: 13,
                      filter: "drop-shadow(10px 7px 10px black",
                    }}
                    src={loginImage}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="boxn" style={{ marginLeft: "5px" }}>
              <div className="boxn-body">
                <div style={{ marginLeft: "150px", marginTop: "20px" }}>
                  <h1
                    style={{
                      fontFamily: "Georgia, serif",
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    LOG IN
                  </h1>
                </div>
                <div className="card-body">
                  <form onSubmit={submitLogin}>
                    <div style={{ marginTop: "50px" }}>
                      <div className="field">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control"
                          placeholder="Email Address"
                          aria-label="Email Address"
                          required
                          style={{
                            width: "70%", // Make all text fields the same width
                            height: 50,
                            background: "#CDC5B5",
                            borderRadius: 10,
                            borderTop: "1px black solid",
                            marginLeft: 75,
                            marginTop: 10,
                          }}
                        />
                      </div>
                      <div className="field">
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control"
                          placeholder="Password"
                          aria-label="Password"
                          required
                          style={{
                            width: "70%", // Make all text fields the same width
                            height: 50,
                            background: "#CDC5B5",
                            borderRadius: 10,
                            borderTop: "1px black solid",
                            marginLeft: 75,
                            marginTop: 10,
                          }}
                        />
                      </div>

                      <br />
                      <div style={{ marginLeft: "150px" }}>
                      
                        <button
                          
                          className="button"
                          type="submit"
                          style={{
                            width: 207,
                            height: 50,
                            background: "#E3D4B7",
                            borderRadius: 60,
                            border: "3px black solid",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#5B3E08";
                          }} /* Change background color on hover */
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#E3D4B7";
                          }} /* Change back to default color when not hovered */
                          onClick={handleLoginClick}
                        >
                          LOG IN
                        </button>
                        
                      </div>
                    </div>
                  </form>

                  
                  <div
                    style={{
                      marginLeft: "140px",
                      marginTop: "20px",
                      hover: "opacity : 1.5",
                    }}
                  >
                    <label htmlFor="inputEmail4" className="form-label">
                      Don't have an account?{" "}
                      <Link to="/signup" style={{ color: "black" }}>
                        SIGN UP
                      </Link>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
