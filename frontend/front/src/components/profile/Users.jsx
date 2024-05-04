import React, { Component, useState, useEffect } from "react";
import "../global.css";
import minilogo from "../../assets/minilogo.png";
import notes from "../../assets/notesicon.png";
import settingslogo from "../../assets/settings-48.png";
import booklogo from "../../assets/booklogo.png";
import logout from "../../assets/logout.png";
import light from "../../assets/light.png";
import saturn from "../../assets/saturn.png";
import why from "../../assets/why.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import { handleLogout } from "../authentication/authService.js";
import { getAuthToken, removeAuthToken } from "../authentication/authService";
import { Toaster } from "sonner";
const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const Users = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState("Initial information");
  const [editableInfo, setEditableInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailsUnderlined, setIsDetailsUnderlined] = useState(false);
  const [isEditProfileUnderlined, setIsEditProfileUnderlined] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    year: "",
    sector: "",
    password: "",
    profile_image: "",
  });

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async (token) => {
      console.log("Fetching user data with token:", token); // Log token for debugging

      try {
        const response = await client.get("/accounts/getuser", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const { first_name, last_name, email, year, sector, password,profile_image } =
          response.data;
        // Handle the received user data as needed
       
        console.log("User Data:", response.data);
        setUserData({
          firstName: first_name,
          lastName: last_name,
          email: email,
          year: year,
          sector: sector,
          password: password,
          profile_image: profile_image,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getAuthToken = () => {
      // Implement logic to retrieve the token from local storage or context
      // For example:
      return localStorage.getItem("authToken");
    };

    const token = getAuthToken(); // Retrieve token from local storage or context
    if (token) {
      fetchUserData(token); // Pass token to fetchUserData function
    } else {
      console.error("No token found");
      // Handle error - Redirect to login or display error message
    }
  }, []);

  useEffect(() => {
    // Check token validity on component mount
    const token = getAuthToken();

    if (!token) {
      // Token is invalid or expired, redirect to login
      window.location.href = "/login";
    }

    // Attach the token to the Authorization header in HTTP requests
    // Make authenticated API calls
  }, []);

  const handleLogout = () => {
    // Remove token and redirect to login
    removeAuthToken();
    window.location.href = "/login";
  };

  const handleDetailsClick = () => {
    setIsDetailsUnderlined(!isDetailsUnderlined);
    setIsEditProfileUnderlined(false);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileUnderlined(!isEditProfileUnderlined);
    setIsDetailsUnderlined(false);
     // Toggle the visibility of the form
  };
 



  const handleEdit = () => {
    setEditableInfo(info);
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    setEditableInfo(event.target.value);
  };

  const handleConfirm = () => {
    setInfo(editableInfo);
    setIsEditing(false);
  };

 
  
  
  const handleMouseEnter = () => {
    setShowConfirmationModal(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setShowConfirmationModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const getImageSource = () => {
    if (image) {
      return URL.createObjectURL(image);
    } else if (userData.profile_image) {
      return `profile_images/${userData.profile_image}`;
    } else {
      return null; // or a default image URL if you have one
    }
  };
  const imageUrl = getImageSource()

  const handleConfirmClick = async () => {
    const formData = new FormData();
    formData.append('profile_image', image);

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put('http://127.0.0.1:8000/accounts/updateimage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Token ${token}`
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error uploading image:', error);
    }
  };
  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put("http://127.0.0.1:8000/accounts/edit-profile", userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      setIsEditProfileUnderlined(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <div className="topbox">
                <img src={minilogo} alt="" />
                <a style={{ color: "white" }}>Student Helper</a>
              </div>
              <h1
                style={{
                  color: "white",
                  marginLeft: "90px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 1.5)",
                }}
              >
                𝗣𝗿𝗼𝗳𝗶𝗹𝗲
              </h1>
              <div className="middilebox">
                <div className="line">
                  <img href="" src={notes}></img>
                  <a href="">𝗢𝘃𝗲𝗿𝘃𝗶𝗲𝘄</a>
                </div>
                <div className="line">
                  <img src={booklogo}></img>
                  <a href="">𝗦𝘂𝗯𝗷𝗲𝗰𝘁𝘀</a>
                </div>
                <div className="line">
                  <img src={notes}></img>
                  <a href="">𝗡𝗼𝘁𝗲𝘀</a>
                </div>
                <div className="line">
                  <img src={settingslogo}></img>
                  <a href="">𝗦𝗲𝘁𝘁𝗶𝗻𝗴𝘀</a>
                </div>
              </div>
              <div className="bottombox">
                <button
                  onClick={handleLogout}
                  style={{
                    color: "white",
                    marginLeft: "5px",
                    marginTop: "30px",
                    background: "none",
                    border: "none",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  type="button"
                >
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      color: "white",
                      marginLeft: "5px",
                      marginRight: "10px",
                    }}
                    src={logout}
                    onClick={handleLogout}
                  ></img>
                  𝗟𝗼𝗴 𝗢𝘂𝘁
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-8">
            <div className="profile">
              <nav className="navbar navbar-expand-lg">
                <div className="navbar">
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <Link to="/" style={{ textDecoration: "none" }}>
                          <a className="nav-link " aria-current="page">
                            Home
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link " aria-current="page" href="#">
                          About us
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link to="/courses" style={{ textDecoration: "none" }}>
                          <a className="nav-link " aria-current="page">
                            Courses
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                      <Link to="/Chatbot" style={{ textDecoration: "none" }}>
                          <a className="nav-link " aria-current="page">
                            ChatBot
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" aria-current="page" href="#">
                          Contact us
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link active "
                          aria-current="page"
                          href="#"
                        >
                          Profile
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              <div className="profileImage" style={{ display: "flex" }}>
                <img
                  src={light}
                  style={{
                    marginLeft: "10px",
                    width: "80px",
                    height: "70px",
                  }}
                />
                <div
                  style={{
                    width: "40rem",
                    height: "10rem",
                    marginLeft: "500px",
                  }}
                >
                  <label htmlFor="imageUpload" style={{ cursor: "pointer" }}>
                    <img
                      src={imageUrl}
                      alt="image profile"
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "60px",
                        border: "7px solid #4D2C5E",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => setShowConfirmationModal(false)}
                    />
                  </label>

                  {showConfirmationModal && (
                    <div
                      className="confirmation-modal"
                      style={{ textDecorationColor: "#4D2C5E" }}
                    >
                      <p>Do you want to change your profile photo?</p>
                      <br></br>
                      <img src = {why} style={{width : "6rem", height:"6rem"}}></img>
                      
                    </div>
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  id="imageUpload"
                  name="profile_image"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                  onClick={handleConfirmClick}
                />
              </div>

              <button
                style={{ marginLeft: "10px" }}
                className={
                  isDetailsUnderlined
                    ? "underlineButton underlined"
                    : "underlineButton"
                }
                onClick={handleDetailsClick}
              >
                My Details
              </button>
              <button
                style={{ marginLeft: "10px" }}
                className={
                  isEditProfileUnderlined
                    ? "underlineButton underlined"
                    : "underlineButton"
                }
                onClick={handleEditProfileClick}
              >
                Edit Profile
              </button>
              <div className="profileData">
                <div className="row">
                  <div className="col-md-4">
                    <label className="inputer" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={userData.firstName}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="inputer" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="text"
                      value={userData.email}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="inputer" htmlFor="year">
                      Year
                    </label>
                    <input
                      id="year"
                      type="text"
                      value={userData.year}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="inputer" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={userData.lastName}
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="inputer" htmlFor="sector">
                      Password
                    </label>
                    <input
                      id="password"
                      type="text"
                      value="****************"
                      readOnly
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="inputer" htmlFor="sector">
                      Sector
                    </label>
                    <input
                      id="sector"
                      type="text"
                      value={userData.sector}
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {isEditProfileUnderlined && (
                <div className="editProfileForm">
                  <form onSubmit={handleEditProfileSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="editFirstName">First Name</label>
                        <input
                          id="editFirstName"
                          type="text"
                          value={userData.firstName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              firstName: e.target.value,
                            })
                          }
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editlastName">Last Name</label>
                        <input
                          id="editLastName"
                          type="text"
                          value={userData.lastName}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              lastName: e.target.value,
                            })
                          }
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editEmail">Email</label>
                        <input
                          id="editEmail"
                          type="text"
                          value={userData.email}
                          onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                          }
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editPassword">Password</label>
                        <input
                          id="editPassword"
                          type="password"
                          value={userData.password}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              password: e.target.value,
                            })
                          }
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-6">
                      <label htmlFor="editSector">Year</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={userData.year}
                          name="year"
                          onChange={(e) =>
                            setUserData({ ...userData, year: e.target.value })
                          }
                          
                          required
                        >
                          <option value="first">First Year</option>
                          <option value="second">Second Year</option>
                          {/* Add more options as needed */}
                        </select>
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="editSector">Sector</label>
                        <select
                          id="editSector"
                          value={userData.sector}
                          onChange={(e) =>
                            setUserData({ ...userData, sector: e.target.value })
                          }
                          className="form-select"
                          aria-label="Default select example"
                          required
                        >
                          <option value="">Sector</option>
                          <option value="IT">Software Engineering</option>
                          <option value="Electrical">Electrical Engineering</option>
                          <option value="Mecanical">Mechanical Engineering</option>
                          <option value="Civil">Civil Engineering</option>
                          <option value="Indus">Industrial Engineering</option>
                          <option value="Math">Mathematical Engineering</option>
                        </select>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-3"></div>
                      <div className="col-md-3 w-50">
                        <button type="submit" className="btn btn-primary w-100">
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div className="row" style={{ marginLeft: "10px" }}>
                <div className="col-md-8">
                  <div className="Courses">
                    <a style={{ color: "#4D2C5E" }}>Last Accessed Material</a>
                    <br></br>
                    <button
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#5B3E08";
                      }} /* Change background color on hover */
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FF7426";
                      }}
                    >
                      Emploi de temps
                    </button>
                    <button
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#5B3E08";
                      }} /* Change background color on hover */
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FF7426";
                      }}
                    >
                      Emploi de temps
                    </button>
                    <br></br>
                    <button
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#5B3E08";
                      }} /* Change background color on hover */
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FF7426";
                      }}
                    >
                      Emploi de temps
                    </button>
                    <button
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#5B3E08";
                      }} /* Change background color on hover */
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#FF7426";
                      }}
                    >
                      Emploi de temps
                    </button>
                  </div>
                </div>
                <div className="col-md-4">
                  <img
                    src={saturn}
                    style={{
                      width: "80px",
                      height: "70px",
                      marginLeft: "120px",
                      marginTop: "70px",
                    }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
