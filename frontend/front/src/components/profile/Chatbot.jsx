import React, { useState, useRef, useEffect } from "react";
import send from "../../assets/arrow.png";
import { getAuthToken, getUserId } from "../authentication/authService";
import axios from "axios";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [room, setRoom] = useState(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (room) {
      fetchMessages();
    }
  }, [room]);

  const fetchMessages = async () => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No authentication token found.");
        return;
      }
  
      const response = await axios.get(`http://127.0.0.1:8000/chatting/getMessages/message/${room}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });
  
      if (response.status === 201) {
        setMessages(response.data);
      } else {
        console.error("Failed to fetch messages:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };
  
  

  
  const sendMessage = async () => {
    if (inputMessage.trim() !== "") {
      try {
        const authToken = getAuthToken();
        if (!authToken) {
          console.error("No authentication token found.");
          return;
        }
  
        const data = {
          value: inputMessage.trim(),
          date: new Date().toISOString(),
          user: "ghaith@ensit.u-tunis.tn",
          room: '1' // Assuming you have user info
        };
  
        console.log("Sending data:", data); // Log the data before sending
  
        const response = await axios.post("http://127.0.0.1:8000/chatting/sendMessage/", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        });
  
        if (response.status === 201) {
          // Update the messages state with the sent message
          setMessages([...messages, response.data]);
          setInputMessage(""); // Clear the input field after sending
        } else {
          console.error("Failed to send message:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };
  
  
      
    
  

  const handleMessageClick = (index) => {
    // Delete the message at the given index
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  return (
    <>
      <div className="container" style={{ overflow: "hidden" }}>
        <nav className="navbar navbar-expand-lg mt-5">
          <div className="navbar">
            <div className="collapse navbar-collapse" id="navbarNav">
              <img
                src={logo} // Replace `logo` with the path to your logo image
                alt="Logo"
                style={{ height: "50px", marginRight: "20px" }} // Adjust height and margin as needed
              />
              <ul className="navbar-nav ml-auto">
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
                    <a className="nav-link active" aria-current="page">
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
                  <a className="nav-link  " aria-current="page" href="#">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className={"home-page loaded"}
          style={{ position: "relative", overflowX: "hidden" }}
        >
          <div
            className={`background-image ${isLoaded ? "loaded" : ""}`}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/bgs.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100vw",
              height: "95vh",
              position: "relative",
            }}
          >
            {/* Old conversation section */}
            <div
              className="oldConversation col-md-2"
              style={{
                backgroundColor: "white", // Light brown color
                padding: "20px",
                height: "80vh",
                position: "fixed",
                left: 0,
                overflow: "hidden", // Hide overflow content
              }}
            >
              <a
                style={{
                  fontFamily: "fantasy",
                  marginLeft: "70px",
                  marginBottom: "50px",
                }}
              >
                Old Conversations
              </a>
              <br></br>

              <ul style={{ listStyle: "none", padding: 0 }}>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  C++ courses
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  DJIKSTRA algorithms
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Machine Learning explaining
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Probablity and Statistics
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  How to center a div
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  C'est quoi le chiffrement de Cesar
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Comment diviser en sous réseau
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Expliquer l'UML briévement
                </li>
                <li
                  style={{
                    marginBottom: "10px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#FFF2D7",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Declare a matrix in C
                </li>
              </ul>
            </div>

            <div
              className={"App loaded col-md-10"}
              style={{ transform: "translate(0%, -10%)" }}
            >
              <div className="centered-container">
                <div
                  className={`chat-container ${isLoaded ? "loaded" : ""}`}
                  style={{ width: "50vw", height: "60vh" }}
                >
                  <div className={`messages ${isLoaded ? "loaded" : ""}`}>
                    {messages.map((message, index) => {
                      return (
                        <div
                          key={index}
                          className={`message ${
                            message.user === "ghaith@ensit.u-tunis.tn"
                              ? "message-right"
                              : "message-left"
                          }`}
                          onClick={() => handleMessageClick(index)}
                        >
                          {message.value}
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                <div
                  className={"input-container loaded"}
                  style={{
                    position: "relative",
                    marginTop: "10px",
                    transform: "translate(20%, 0%)",
                  }}
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    style={{
                      paddingRight: "40px",
                      marginTop: "5px",
                      width: "calc(100% - 50px)",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    }}
                    placeholder="Type a message..."
                  />
                  <img
                    src={send}
                    alt="Send"
                    style={{
                      cursor: "pointer",
                      position: "absolute",
                      top: "50%",
                      right: "25px",
                      transform: "translateY(-50%)",
                      height: "30px",
                      width: "30px",
                    }}
                    onClick={sendMessage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
