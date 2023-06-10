import React from 'react';
import { useState } from 'react';
import './DoctorsLogin.css';
import Navigation from './Navigation/Navigation';
import Profile from './Page/Profile/Profile';
import axios from 'axios';

export default function DoctorsLogin() {
  const [doctor, setDoctor] = useState(() => {
    try {
      const storedDoctor = localStorage.getItem('doctor');
      return storedDoctor ? JSON.parse(storedDoctor) : null;
    } catch (error) {
      console.error('Error parsing stored doctor:', error);
      return null;
    }
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdate = () => {
    setDoctor(JSON.parse(localStorage.getItem('doctor')));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/doctors/login',
        {
          email,
          pass: password,
        }
      );
      localStorage.setItem('doctor', JSON.stringify(response.data));
      setDoctor(response.data);
    } catch (error) {
      console.error('Error during doctor login:', error);
    }
  };
  const handleLogout = () => {
    localStorage.setItem('doctor', null);
    setDoctor(null);
  };

  const [selectedComponent, setSelectedComponent] = useState('dashboard');

  const handleSidebarSelection = (component) => {
    setSelectedComponent(component);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'Home':
        return <div>Home</div>;
      case 'Appointments':
        return <div>Appointments</div>;
      case 'profile':
        return <Profile handleUpdate={handleUpdate} />;
      case 'history':
        return <div>history</div>;
      case 'temp':
        return <div>Temp</div>;
      default:
        return null;
    }
  };

  if (!doctor)
    return (
      <>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </>
    );

  return (
    <div>
      <div className="nav navbar bg-primary shadow">
        <div>
          <h3>Welcome Dr. {doctor.f_name}</h3>
        </div>
        <div className="p-2">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div
        style={{ height: '38.67rem', display: 'flex' }}
        className="container-fluid"
      >
        <div style={{ width: '14rem', position: 'sticky', top: 0 }}>
          {<Navigation handleSelection={handleSidebarSelection} />}
        </div>
        <div
          style={{
            width: '84%',
            height: 'auto',
            background: '#f9fafe',
            overflow: 'auto',
          }}
        >
          <div className="content">{renderSelectedComponent()}</div>
        </div>
      </div>
    </div>
  );
}
