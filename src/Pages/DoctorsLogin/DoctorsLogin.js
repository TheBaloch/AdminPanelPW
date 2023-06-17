import React from 'react';
import { useState } from 'react';
import './DoctorsLogin.css';
import Navigation from './Navigation/Navigation';
import Profile from './Page/Profile/Profile';
import Appointments from './Page/Appointments/Appointments';
import Pending from './Page/Appointments/Pending';
import Approved from './Page/Appointments/Approved';
import Rejected from './Page/Appointments/Rejected';

export default function DoctorsLogin({ handleLogout }) {
  const [doctor, setDoctor] = useState(() => {
    try {
      const storedDoctor = localStorage.getItem('doctor');
      return storedDoctor ? JSON.parse(storedDoctor) : null;
    } catch (error) {
      console.error('Error parsing stored doctor:', error);
      return null;
    }
  });

  const handleUpdate = () => {
    setDoctor(JSON.parse(localStorage.getItem('doctor')));
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
        return <Appointments />;
      case 'profile':
        return <Profile handleUpdate={handleUpdate} />;
      case 'Pending':
        return <Pending />;
      case 'Approved':
        return <Approved />;
      case 'Rejected':
        return <Rejected />;
      case 'temp':
        return <div>NuN</div>;
      default:
        return null;
    }
  };

  if (doctor)
    return (
      <div>
        <div className="nav navbar bg-primary shadow">
          <div>
            <h3>
              Welcome Dr. {doctor.f_name} {doctor.l_name}
            </h3>
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
