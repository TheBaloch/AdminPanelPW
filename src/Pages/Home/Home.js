import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Orders from '../../components/Orders/Orders';
import DayCare from '../../components/DayCare/DayCare';
import Users from '../../components/Users/Users';
import Products from '../../components/Products/Products';
import Insurance from '../../components/Insurance/Insurance';
import "./Home.css";

const MainHome = () => {
  const [selectedComponent, setSelectedComponent] = useState('products');

  // Function to handle sidebar selection
  const handleSidebarSelection = (component) => {
    setSelectedComponent(component);
  };

  // Function to render the selected component
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'products':
        return <Products />;
      case 'users':
        return <Users />;
      case 'daycare':
        return <DayCare />;
      case 'insurance':
        return <Insurance />;
      case 'orders':
        return <Orders />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* <Sidebar handleSelection={handleSidebarSelection} /> */}
      <div style={{height:"100%"}} className="container-fluid">
        <div style={{height:"100%"}} className="row">
          <div style={{width:"16%"}}>
            <Sidebar handleSelection={handleSidebarSelection} />
          </div>
          <div style={{width:"84%",background:"#f9fafe"}}>
            <div className="content">{renderSelectedComponent()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainHome;
