import React from 'react';
import { useState } from 'react';
import './DoctorsLogin.css';
import Navigation from './Navigation/Navigation';

export default function DoctorsLogin() {
  const [selectedComponent, setSelectedComponent] = useState('dashboard');

  // Function to handle sidebar selection
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
        return <div>Profile</div>;
      case 'history':
        return <div>history</div>;
      case 'temp':
        return <div>Temp</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <navbar className="nav navbar bg-primary shadow">
        <div>
          <h3>Welcome Dr.Abdullah</h3>
        </div>
        <div className="p-2">
          <button>Logout</button>
        </div>
      </navbar>
      <div
        style={{ height: '100%', display: 'flex' }}
        className="container-fluid"
      >
        <div style={{ width: '14rem', position: 'sticky', top: 0 }}>
          {<Navigation handleSelection={handleSidebarSelection} />}
        </div>
        <div style={{ width: '84%', background: '#f9fafe', overflow: 'auto' }}>
          <div className="content">{renderSelectedComponent()}</div>
        </div>
      </div>
    </div>
  );
}
