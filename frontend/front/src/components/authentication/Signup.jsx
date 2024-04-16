import React, { Component,useState,useEffect } from "react";
import "../global.css"
import logo from "../../assets/logo.png";
import image from "../../assets/image.png";
import axios from 'axios';
//import { Link } from "react-router-dom";
//this function here will handle the Log in button in case you have an account and you are in the sign page 
// in the hide and show logic i just used ! to swipe between the divs  that contain the information of part 1 sign up and part 2


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});
const SignUp = () => {
  const [showDiv, setShowDiv] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [sector, setSector] = useState('');
  const [year, setYear] = useState('');

  function submitRegistration(e) {
    e.preventDefault();
   
    
    client.post("/api/register", {
      email:email,
      password:password,
      first_name:first_name,
      last_name:last_name,
      year:year,
      sector:sector
    }).then(function(res){
      window.location.href = "/login";
    })
  }

  
    return (
      <>
        
        {!showDiv && (
          <>
            <div className="container">
              <div className="row">
                <div className="col"></div>
                <div className="col  justify-content-center">
            <img
              style={{
                width: "150",
                height: "150",
                borderRadius: "13",
                marginLeft: "50px",
              }}
              src={logo}
              alt=""
            />
          </div>
                <div className="col"></div>
              </div>
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
                        src={image}
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
                        SIGN UP
                      </h1>
                    </div>
                    <div className="card-body">
                      <form onSubmit={submitRegistration}>
                        <div style={{ marginTop: "50px" }}>
                          <div className="field">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Email Address"
                              aria-label="Email Address"
                              value={email} 
                              onChange={e => setEmail(e.target.value)}
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
                              className="form-control"
                              placeholder="Password"
                              aria-label="Password"
                              value={password} onChange={e => setPassword(e.target.value)}
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
                          {/* <div className="field">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Repeat Password"
                              aria-label="Repeat Password"
                              value={password} onChange={e => setPassword(e.target.value)}
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
                          </div> */}

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
                              onClick={toggleDiv}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#5B3E08";
                              }} /* Change background color on hover */
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "#E3D4B7";
                              }} /* Change back to default color when not hovered */
                            >
                              SIGN UP
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
                          Already have an account?{" "}
                          <a href="/login" style={{ color: "black" }}>
                          Log in
                          </a>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {showDiv && (
          <>
            <div className="container">
              <div className="row">
                <div className="col"></div>
                <div className="col  justify-content-center">
                  <img
                    style={{
                      width: "150",
                      height: "150",
                      borderRadius: "13",
                      marginLeft: "60px",
                    }}
                    src={logo}
                    alt=""
                  />
                </div>
                <div className="col"></div>
              </div>
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
                        src={image}
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="boxn" style={{ marginLeft: "10px" }}>
                  <div className="boxn-body">
                    <div style={{ marginLeft: "100px", marginTop: "20px" }}>
                      <h1
                        style={{
                          fontFamily: "Georgia, serif",
                          fontWeight: "bold",
                          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        Almost there..
                      </h1>
                    </div>
                    <div className="card-body">
                    <form onSubmit={submitRegistration}>
                  <div style={{ marginTop: "50px" }}>
                    <div className="row">
                      <div className="col">
                        <div className="field">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            aria-label="First Name"
                            value={first_name} onChange={e => setfirst_name(e.target.value)}
                            required
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="field">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                            aria-label="Last Name"
                            value={last_name} onChange={e => setlast_name(e.target.value)}
                            required
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                      {/* <div className="col">
                        <div className="field">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            aria-label="Email Address"
                            required
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          />
                        </div>
                      </div> */}
                      {/* <div className="col">
                        <div className="field">
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            required
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          />
                        </div>
                      </div> */}
                    </div>
                    <br></br>
                    <div className="row">
                    <div className="col">
                        <div className="field">
                          <select
                          value={sector}
                          onChange={e => setSector(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          >
                            
                            <option value="it">Software Engineering</option>
                            <option value="elec">Electrical Engineering</option>
                            <option value="mec">Mecanical Engineering</option>
                            <option value="civil">Civil Engineering</option>
                            <option value="indus">Industrial Engineering</option>
                            <option value="math">Mathematical Engineering</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="field">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={year} onChange={e => setYear(e.target.value)}
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          >
                            <option value="year">Year</option>
                            <option value="first">First Year</option>
                            <option value="secand">Secand Year</option>
                          </select>
                        </div>
                      </div>
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
                          //href:"/login"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#5B3E08";
                        }} /* Change background color on hover */
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#E3D4B7";
                        }} /* Change back to default color when not hovered */
                      >
                        Confirm
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
                  
                </div>
              </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }


export default SignUp;
