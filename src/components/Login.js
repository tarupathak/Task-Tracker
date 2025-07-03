import React, { useState } from "react";
import { saveUser } from "../utils/localStorage";
import "../styles/Login.css";
import logo from "../assets/logo.png";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUsername }) => {
  const [input, setInput] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (input.trim()) {
      saveUser(input);
      setUsername(input);
      toast.success("Logged in successfully!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-dark">
        <div className="login-logo">
          <img src={logo} alt="logo" height={40} />
        </div>
        <h2>Welcome Back</h2>
        <h2>To</h2>
        <h2>Task Tracker</h2>
        <form onSubmit={handleLogin} className="login-form-dark">
          <div className="input-wrapper">
            <span className="icon">📧</span>
            <input
              type="text"
              placeholder="Username"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="primary-button">
            Login
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Login;
