import React from 'react';

const Sidebar = ({ handleSelection }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button onClick={() => handleSelection('products')}>Products</button>
        </li>
        <li>
          <button onClick={() => handleSelection('users')}>Users</button>
        </li>
        <li>
          <button onClick={() => handleSelection('daycare')}>Day Care</button>
        </li>
        <li>
          <button onClick={() => handleSelection('insurance')}>
            Insurance
          </button>
        </li>
        <li>
          <button onClick={() => handleSelection('orders')}>Orders</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
