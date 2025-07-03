import React, { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import { getUser, removeUser } from "./utils/localStorage";
import "./App.css";
import logo from "./assets/logo.png";

const App = () => {
  const [username, setUsername] = useState(getUser());

  const handleLogout = () => {
    removeUser();
    setUsername("");
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="logo" />
          <span className="title">Task Tracker</span>
        </div>
        {username && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
      {username ? (
        <TaskList username={username} />
      ) : (
        <Login setUsername={setUsername} />
      )}
    </>
  );
};

export default App;
