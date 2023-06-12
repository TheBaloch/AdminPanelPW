import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ handleUpdate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>Login</h3>
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
