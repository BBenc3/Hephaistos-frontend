import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e, setData) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7008/login', loginData);
      const token = response.data.token;
      setMessage(`Login successful: ${response.data.message}`);
      alert(`JWT Token: ${token}`);
    } catch (error) {
      setMessage(`Login failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7008/register', registerData);
      setMessage(`Registration successful: ${response.data.message}`);
    } catch (error) {
      setMessage(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Login & Register</h1>

      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => handleInputChange(e, setLoginData)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => handleInputChange(e, setLoginData)}
          />
          <button type="submit">Login</button>
        </form>

        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={registerData.username}
            onChange={(e) => handleInputChange(e, setRegisterData)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={registerData.email}
            onChange={(e) => handleInputChange(e, setRegisterData)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerData.password}
            onChange={(e) => handleInputChange(e, setRegisterData)}
          />
          <button type="submit">Register</button>
        </form>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default App;
