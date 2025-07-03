import React, { useState } from "react";
import Login from "./components/Login";
import TaskList from "./components/TaskList";
import { getUser, removeUser } from "./utils/localStorage";
import "./App.css";
import logo from "./assets/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [username, setUsername] = useState(getUser());

  const handleLogout = () => {
    removeUser();
    setUsername("");
    toast.success("Logged out successfully!");
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

      {/* Toast container at the bottom-right corner */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default App;
