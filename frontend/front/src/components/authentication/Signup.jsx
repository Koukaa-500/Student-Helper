import React, { useState } from "react";
import "../global.css";
import logo from "../../assets/logo.png";
import image from "../../assets/image.png";
import axios from "axios";
import { Link } from "react-router-dom"
const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const StepOne = ({ formData, handleChange, handleNextStep }) => (
  <form onSubmit={handleNextStep}>
    <div style={{ marginTop: "50px" }}>
      <div className="field">
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Email Address"
          aria-label="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: "80%", // Make all text fields the same width
            height: 50,
            background: "#FDF8EE",
            borderRadius: 10,
            borderTop: "1px black solid",
            borderLeft: "1px black solid",
            borderBottom: "1px black solid",
            borderRight: "1px black solid",
            marginLeft: 50,
            marginTop: 10,
          }}
        />
      </div>
      <div className="field">
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          aria-label="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: "80%", // Make all text fields the same width
            height: 50,
            background: "#FDF8EE",
            borderRadius: 10,
            borderTop: "1px black solid",
            borderLeft: "1px black solid",
            borderBottom: "1px black solid",
            borderRight: "1px black solid",
            marginLeft: 50,
            marginTop: 10,
          }}
        />
      </div>
      <br />
      <div style={{ marginLeft: "140px" }}>
        <button
          className="button"
          type="submit"
          style={{
            width: 207,
            height: 50,
            background: "#FDF8EE",
            borderRadius: 60,
            border: "3px black solid",
          }}
        >
          Next
        </button>
      </div>
    </div>
  </form>
);

const StepTwo = ({ formData, handleChange, handlePrevStep, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div style={{ marginTop: "50px" }}>
      <div className="row">
        <div className="col">
          <div className="field">
            <input
              type="text"
              name="first_name"
              className="form-control"
              placeholder="First Name"
              aria-label="First Name"
              value={formData.first_name}
              onChange={handleChange}
              required
              style={{
                height: 50,
                background: "#FDF8EE",
                borderRadius: 10,
                borderTop: "1px black solid",
                borderLeft: "1px black solid",
                borderBottom: "1px black solid",
                borderRight: "1px black solid",
              }}
            />
          </div>
        </div>
        <div className="col">
          <div className="field">
            <input
              type="text"
              name="last_name"
              className="form-control"
              placeholder="Last Name"
              aria-label="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              required
              style={{
                height: 50,
                background: "#FDF8EE",
                borderRadius: 10,
                borderTop: "1px black solid",
                borderLeft: "1px black solid",
                borderBottom: "1px black solid",
                borderRight: "1px black solid",
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col">
          <div className="field">
            <select
              value={formData.sector}
              onChange={handleChange}
              name="sector"
              className="form-select"
              aria-label="Default select example"
              style={{
                height: 50,
                background: "#FDF8EE",
                borderRadius: 10,
                borderTop: "1px black solid",
                borderLeft: "1px black solid",
                borderBottom: "1px black solid",
                borderRight: "1px black solid",
              }}
              required
            >
              <option >sector</option>
              <option value="CS">Software Engineering</option>
              <option value="Elec">Electrical Engineering</option>
              <option value="Mec">Mechanical Engineering</option>
              <option value="Civil">Civil Engineering</option>
              <option value="Indus">Industrial Engineering</option>
              <option value="App Math">Mathematical Engineering</option>
            </select>
          </div>
        </div>
        <div className="col">
          <div className="field">
            <select
              className="form-select"
              aria-label="Default select example"
              value={formData.year}
              name="year"
              onChange={handleChange}
              style={{
                height: 50,
                background: "#FDF8EE",
                borderRadius: 10,
                borderTop: "1px black solid",
                borderLeft: "1px black solid",
                borderBottom: "1px black solid",
                borderRight: "1px black solid",
              }}
              required
            >

              <option value="first">First Year</option>
              <option value="second">Second Year</option>
            </select>
          </div>
        </div>
      </div>
      <br />
      <div style={{ marginLeft: "0px" }}>
        <button
          className="button"
          type="submit"
          style={{
            marginLeft: "2Linkpx",
            width: 207,
            height: 50,
            background: "#FDF8EE",
            borderRadius: 60,
            border: "3px black solid",
          }}
        >
          Confirm
        </button>
        <button
          className="button"
          type="button"
          onClick={handlePrevStep}
          style={{
            marginLeft: "10px",
            width: 207,
            height: 50,
            background: "#FDF8EE",
            borderRadius: 60,
            border: "3px black solid",
            marginRight: "10px",
          }}
        >
          Back
        </button>
      </div>
    </div>
  </form>
);

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    sector: "",
    year: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/accounts/signup', formData)
      .then(response => {
        console.log(response.data);
        window.location.href = "/login";
        // Handle successful signup
      })
      .catch(error => {
        console.error('Error:', error.response ? error.response.data : error);
        // Handle error
      });

  };

  return (
    <>

      <div className="rectangle">


        <img
          style={{
            width: "150",
            height: "150",
            borderRadius: "13",
            marginLeft: "16%"
          }}
          src={logo}
          alt=""
        />


      </div>
      <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id="16454ecf-7de3-450a-ab68-927931473442" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
      <div className="container" style={{ marginLeft: "5%" }}>
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
                    filter: "drop-shadow(10px 7px 10px black)",
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
                {step === 1 && (
                  <StepOne
                    formData={formData}
                    handleChange={handleChange}
                    handleNextStep={handleNextStep}
                  />
                )}
                {step === 2 && (
                  <StepTwo
                    formData={formData}
                    handleChange={handleChange}
                    handlePrevStep={handlePrevStep}
                    handleSubmit={handleSubmit}
                  />
                )}
                <div
                  style={{
                    marginLeft: "140px",
                    marginTop: "20px",
                  }}
                >
                  <label htmlFor="inputEmail4" className="form-label">
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "black" }}>
                      Log in
                    </Link>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
