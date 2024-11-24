import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:8010");
function App() {
  return (
    <div className="app">
      {!isJoined ? (
        <div className="join-container">
          <input
            type="text"
            placeholder="Enter Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleJoin}>Submit</button>
        </div>
      ) : (
        <div className="chat-container">
          <div className="chat-header">
            <h3>
              Welcome <span className="username-highlight">{username}</span>
            </h3>
          </div>
          <div className="users">
            <h3>Users</h3>
            <div className="user-tags">
              {users.map((user) => (
                <span
                  key={user.id}
                  className={
                    user.username === username ? "tag self-tag" : "tag"
                  }
                >
                  {user.username}
                </span>
              ))}
            </div>
          </div>
          <div className="chat">
            <div className="messages">
              {messages.map((msg, index) => {
                console.log("msg", msg);
                return (
                  <div
                    key={index}
                    className={
                      msg.username === username ? "message self" : "message"
                    }
                  >
                    <strong
                      className={
                        msg.username === username ? "message myname" : "message"
                      }
                    >
                      {msg.username} :
                    </strong>{" "}
                    {msg.message}
                  </div>
                );
              })}
            </div>
            <div className="input-container">
              <input
                type="text"
                placeholder="Enter Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
