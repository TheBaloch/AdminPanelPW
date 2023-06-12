import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const LoginForm = ({ handleUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      if (email === 'admin@petsworld.com') {
        try {
          const response = await axios.post(
            'http://localhost:5000/admin/verify',
            {
              email,
              pass: password,
            }
          );
          localStorage.setItem('admin', JSON.stringify(response.data));
          setEmail('');
          setPassword('');
          handleUpdate();
        } catch (error) {
          console.error('Error during doctor login:', error);
        }
      } else {
        try {
          const response = await axios.post(
            'http://localhost:5000/api/doctors/login',
            {
              email,
              pass: password,
            }
          );
          localStorage.setItem('doctor', JSON.stringify(response.data));
          setEmail('');
          setPassword('');
          handleUpdate();
        } catch (error) {
          console.error('Error during doctor login:', error);
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="card-header">
          <div className="logo-container">
            <img className="logo" src="./img/logo.png" alt="Logo" />
          </div>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button-container">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
