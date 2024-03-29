// import React, { useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Orders from "../../components/Orders/Orders";
// import DayCare from "../../components/DayCare/DayCare";
// import Users from "../../components/Users/Users";
// import Products from "../../components/Products/Products";
// import Insurance from "../../components/Insurance/Insurance";
// import Dashboard from "../../components/Dashboard/Dashboard";
// import "./Home.css";
// import Doctors from "../../components/Doctors/Doctors";
// import BuyandSell from "../../components/BuyandSell/BuyandSell";

// const MainHome = () => {
//   const [selectedComponent, setSelectedComponent] = useState("dashboard");

//   // Function to handle sidebar selection
//   const handleSidebarSelection = (component) => {
//     setSelectedComponent(component);
//   };

//   // Function to render the selected component
//   const renderSelectedComponent = () => {
//     switch (selectedComponent) {
//       case "dashboard":
//         return <Dashboard />;
//       case "products":
//         return <Products />;
//       case "users":
//         return <Users />;
//       case "doctors":
//         return <Doctors />;
//       case "daycare":
//         return <DayCare />;
//       case "insurance":
//         return <Insurance />;
//       case "orders":
//         return <Orders />;

//       case "buyandsell":
//         return <BuyandSell />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {/* <Sidebar handleSelection={handleSidebarSelection} /> */}
//       <div
//         style={{ height: "100%", display: "flex" }}
//         className="container-fluid"
//       >
//         <div style={{ width: "16%", position: "sticky", top: 0 }}>
//           <Sidebar handleSelection={handleSidebarSelection} />
//         </div>
//         <div style={{ width: "84%", background: "#f9fafe", overflow: "auto" }}>
//           <div className="content">{renderSelectedComponent()}</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MainHome;

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Orders from '../../components/Orders/Orders';
import DayCare from '../../components/DayCare/DayCare';
import Users from '../../components/Users/Users';
import Products from '../../components/Products/Products';
import Insurance from '../../components/Insurance/Insurance';
import Dashboard from '../../components/Dashboard/Dashboard';
import './Home.css';
import Doctors from '../../components/Doctors/Doctors';
import BuyandSell from '../../components/BuyandSell/BuyandSell';
import Verification from '../../components/Verification/Verification';

const MainHome = ({ handleLogout }) => {
  const [selectedComponent, setSelectedComponent] = useState(
    localStorage.getItem('selectedComponent') || 'dashboard'
  );

  // Function to handle sidebar selection
  const handleSidebarSelection = (component) => {
    setSelectedComponent(component);
  };

  // Save the selected component to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedComponent', selectedComponent);
  }, [selectedComponent]);

  // Function to render the selected component
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'users':
        return <Users />;
      case 'doctors':
        return <Doctors />;
      case 'daycare':
        return <DayCare />;
      case 'insurance':
        return <Insurance />;
      case 'orders':
        return <Orders />;
      case 'buyandsell':
        return <BuyandSell />;
      case 'verification':
        return <Verification />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        style={{ height: '100%', display: 'flex' }}
        className="container-fluid"
      >
        <div style={{ width: '16%', position: 'sticky', top: 0 }}>
          <Sidebar
            handleSelection={handleSidebarSelection}
            handleLogout={handleLogout}
          />
        </div>
        <div style={{ width: '84%', background: '#f9fafe', overflow: 'auto' }}>
          <div className="content">{renderSelectedComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default MainHome;
