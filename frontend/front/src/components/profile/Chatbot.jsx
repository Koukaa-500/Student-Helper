import React, { useState, useRef, useEffect } from "react";
import send from "../../assets/arrow.png";
import { getAuthToken , getUserId } from "../authentication/authService";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [discussionId, setDiscussionId] = useState(null);

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
    if (discussionId) {
      fetchMessages();
    }
  }, [discussionId]);

  const fetchMessages = async () => {
    try {
      const authToken = getAuthToken();
      if (!authToken) {
        console.error("No authentication token found.");
        return;
      }

      const response = await axios.get(`http://127.0.0.1:8000/accounts/getMessage/${discussionId}`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });

      if (response.status === 200) {
        setMessages(response.data.conversation_details);
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
  
        const response = await axios.post(
          "http://127.0.0.1:8000/accounts/sendMessage",
          {
            content: inputMessage.trim(),
            conversation_id: discussionId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
          }
        );
  
        if (response.status === 200) {
          setMessages([...messages, response.data]);
          setInputMessage("");
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
    <div className={"home-page loaded"} style={{ position: "relative", overflowX: "hidden" }}>
      <div className={`background-image ${isLoaded ? "loaded" : ""}`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bgs.png)`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100vw", height: "100vh", position: "relative" }}>
        <div className={"App loaded"} style={{ transform: "translate(-20%, 0%)" }}>
          <div className="centered-container">
            <div className={`chat-container ${isLoaded ? "loaded" : ""}`} style={{ width: "60vw", height: "60vh" }}>
              <div className={`messages ${isLoaded ? "loaded" : ""}`}>
                {messages.map((message, index) => {
                  return (
                    <div key={index} className={`message message-left`} onClick={() => handleMessageClick(index)}>
                      {message.content}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className={"input-container loaded"} style={{ transform: "translate(25% ,0%)" }}>
              <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={(e) => { if (e.key === "Enter") { sendMessage(); } }} style={{ marginTop: "5px" }} placeholder="Type a message..." />
              <img src={send} alt="Send" style={{ cursor: "pointer", height: "30", width: "50px" }} onClick={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
