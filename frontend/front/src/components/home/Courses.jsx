import React, { useState, useEffect } from "react";
import "../global.css";
import minilogo from "../../assets/minilogo.png";
import notes from "../../assets/notesicon.png";
import settingslogo from "../../assets/settings-48.png";
import booklogo from "../../assets/booklogo.png";
import logout from "../../assets/logout.png";
import axios from "axios";
import { Link } from 'react-router-dom';
import { removeAuthToken } from "../authentication/authService";

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const Courses = () => {
  const [image, setImage] = useState(null);
  const [info, setInfo] = useState("Initial information");
  const [editableInfo, setEditableInfo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailsUnderlined, setIsDetailsUnderlined] = useState(false);
  const [isEditProfileUnderlined, setIsEditProfileUnderlined] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    year: "",
    sector: "",
    password: "",
    profile_image: "",
  });
  const [documents, setDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/documents/search");
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleDownload = () => {
    // Perform the logic to fetch or generate the file
    // For example, you can use fetch to download a file from a server
    fetch('/path/to/file.pdf')
      .then(response => response.blob())
      .then(blob => {
        // Create a URL for the file blob
        const url = window.URL.createObjectURL(new Blob([blob]));

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); // Set the download attribute with the desired file name
        document.body.appendChild(link);

        // Trigger the click event to initiate the download
        link.click();

        // Cleanup: remove the link and revoke the URL
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
      });
  };

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
    // Define the getAuthToken function or import it if defined elsewhere
    const getAuthToken = () => {
      // Implement logic to retrieve the token from local storage or context
      // For example:
      return localStorage.getItem("authToken");
    };
  
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

  

  
  

  

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/search_data", {
        params: {
          year: searchQuery,
          sector: searchQuery,
          field: searchQuery,
        },
      });

      setDocuments(response.data);
    } catch (error) {
      console.error("Error searching data:", error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
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
                        <a className="nav-link " aria-current="page">
                          About us
                        </a>
                      </li>
                      <li className="nav-item">
                        <Link to="/courses" style={{ textDecoration: "none" }}>
                          <a className="nav-link " aria-current="page" href="#">
                            Courses
                          </a>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link " aria-current="page" href="#">
                          ChatBot
                        </a>
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
              <div>
                <form className="d-flex" role="search" onSubmit={handleSearch}>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={handleSearchInputChange}
                    name="searchQuery"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
              {/* Document cards */}
              {documents.map((document) => (
                <div key={document.id} className="carta">
                  {/* Document content */}
                  <a class="btn btn-primary" onClick={handleDownload}>Download</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
