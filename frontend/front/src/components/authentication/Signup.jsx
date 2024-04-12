import React, { Component } from "react";
import ".//signup.css";
import logo from "../../assets/logo.png";
import image from "../../assets/image.png";
//import { Link } from "react-router-dom";
//this function here will handle the Log in button in case you have an account and you are in the sign page 
// in the hide and show logic i just used ! to swipe between the divs  that contain the information of part 1 sign up and part 2

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDiv: false // Initially hide the div
    };
  }

  toggleDiv = () => {
    // Toggle the state to show/hide the div
    this.setState((prevState) => ({
      showDiv: !prevState.showDiv
    }));
  };
  render() {
    const { email, password, step } = this.state;
    return (
      <>
        
        {!this.state.showDiv && (
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
                <div className="box">
                  <div className="box-body">
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

                <div className="box" style={{ marginLeft: "10px" }}>
                  <div className="box-body">
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
                      <form>
                        <div style={{ marginTop: "50px" }}>
                          <div className="field">
                            <input
                              type="text"
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
                          <div className="field">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Repeat Password"
                              aria-label="Repeat Password"
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
                              onClick={this.toggleDiv}
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

        {this.state.showDiv && (
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
                <div className="box">
                  <div className="box-body">
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

                <div className="box" style={{ marginLeft: "10px" }}>
                  <div className="box-body">
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
                    <form>
                  <div style={{ marginTop: "50px" }}>
                    <div className="row">
                      <div className="col">
                        <div className="field">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="First Name"
                            aria-label="First Name"
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
                      <div className="col">
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
                      </div>
                      <div className="col">
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
                      </div>
                    </div>
                    <br></br>
                    <div className="row">
                    <div className="col">
                        <div className="field">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            style={{
                              height: 50,
                              background: "#CDC5B5",
                              borderRadius: 10,
                              borderTop: "1px black solid",
                            }}
                          >
                            <option value="sector">Sector</option>
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
                          href:"/login"
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
}

export default SignUp;
