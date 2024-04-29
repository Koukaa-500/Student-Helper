import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add user message to the chat
    setMessages([...messages, { author: 'user', text: input }]);

    // Simulate a response from the chatbot
    // For this example, the chatbot's response is hardcoded
    // In a real-world scenario, you'd send the user's message to a server to get a response
    const botResponse = `You said: "${input}". I'm just a simple bot, so I don't know what to say yet.`;

    // Add bot response to the chat
    setMessages([...messages, { author: 'bot', text: botResponse }]);

    // Clear the input
    setInput('');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Chat with the Chatbot</h1>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((message, index) => (
          <p key={index} style={{ textAlign: message.author === 'bot' ? 'left' : 'right' }}>
            <strong>{message.author === 'bot' ? 'Chatbot' : 'You'}:</strong> {message.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={{ width: '100%', marginTop: '10px', padding: '5px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '5px' }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;
