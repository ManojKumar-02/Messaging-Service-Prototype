// src/components/messaging/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const Chat = ({ match }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const newSocket = io('http://localhost:3000');

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Listen for incoming messages
    newSocket.on('message', (data) => {
      // Handle incoming message
      setMessages([...messages, data]);
    });

    setSocket(newSocket);

    return () => {
      // Disconnect the WebSocket when the component unmounts
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [messages]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (socket) {
      // Send the message to the WebSocket server
      socket.emit('message', { content: message, sender: 'user_id', receiver: match.params.userId });
    }

    setMessage('');
  };

  return (
    <div>
      <h2>Chat with User</h2>
      <div>
        {/* Display messages */}
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg.content}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
