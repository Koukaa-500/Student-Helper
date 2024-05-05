import React, { useState, useRef, useEffect } from "react";
import send from "../../assets/arrow.png";
import { getAuthToken, getUserId } from "../authentication/authService";
import axios from "axios";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [room, setRoom] = useState(null);
  const [value, setValue] = useState("");
  const messagesEndRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

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
    if (!room) {
      createRoom();
    } else {
      fetchMessages();
    }
  }, [room]);

  const createRoom = async () => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No authentication token found.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/chatting/createRoom/",
        {
          name: "New Room Name",
          messages: messages,
        },
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        setRoom(response.data.id);
      } else {
        console.error("Failed to create room:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No authentication token found.");
        return;
      }
      if (!value) {
        console.log("No room exists yet.");
        // Handle the case where there are no messages (new chat)
        // For example, you can set an empty array for messages in the state
        setMessages([]);
        return;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/chatting/getMessages/message/${room}/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setMessages(response.data);
      } else {
        console.error("Failed to fetch messages:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async () => {
    // Check if room is not set, then create a new room
    if (!room) {
      await createRoom();
    }
  
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
          room: room, // Set the room value here
        };
  
        console.log("Sending data:", data); // Log the data before sending
  
        const response = await axios.post(
          "http://127.0.0.1:8000/chatting/sendMessage/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
          }
        );
  
        if (response.status === 201) {
          // Update the messages state with the sent message and the bot's response
          setMessages([
            ...messages,
            response.data, // User's message
            {
              value: "I'm not integrated yet.", // Bot's response
              user: "bot",
            }
          ]);
          setInputMessage(""); // Clear the input field after sending
        } else {
          console.error("Failed to send message:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };
  
  
  useEffect(() => {
    const saveConversationDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/chatting/save_room_conversation/${room}/`,
          { messages: messages },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${getAuthToken()}`,
            },
          }
        );

        if (response.status === 200) {
          setSuccess(true);
        } else {
          setError('Failed to save conversation details');
        }
      } catch (error) {
        console.error('Failed to save conversation details:', error);
        setError('Failed to save conversation details');
      } finally {
        setIsLoading(false);
      }
    };

    if (messages && messages.length > 0) {
      saveConversationDetails();
    }
  }, [room, messages]);


  const handleMessageClick = (message) => {
    setInputMessage(message.value);
  };

  return (
    <>
      <div className="container" style={{ overflow: "hidden" }}>
        <nav className="navbar navbar-expand-lg mt-5">
          <div className="navbar">
            <div className="collapse navbar-collapse" id="navbarNav">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", marginRight: "20px" }}
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
            <div
              className="oldConversation col-md-2"
              style={{
                backgroundColor: "white",
                padding: "20px",
                height: "80vh",
                position: "fixed",
                left: 0,
                overflow: "hidden",
              }}
            >
              <a
                style={{
                  fontFamily: "fantasy",
                  marginLeft: "70px",
                  marginBottom: "50px",
                }}
              >
                Rooms
              </a>
              <br></br>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {messages.map((message, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: "10px",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor: "#FFF2D7",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMessageClick(message)}
                  >
                    {message.value}
                  </li>
                ))}
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
                          onClick={() => handleMessageClick(message)}
                          style={{
                            backgroundColor:
                              message.user === "bot" ? "#e0e0e0" : "blue",
                          }}
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
