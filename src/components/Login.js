import React, { useState } from 'react';
import { saveUser } from '../utils/localStorage';
import '../styles/Login.css';

const Login = ({ setUsername }) => {
  const [input, setInput] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (input.trim()) {
      saveUser(input);
      setUsername(input);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card-dark">
        <div className="login-logo">⚡</div>
        <h2>Welcome Back</h2>
        {/* <p className="subtext">
          Don't have an account yet? <span className="link">Sign up</span>
        </p> */}
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
    </div>
  );
};

export default Login;
