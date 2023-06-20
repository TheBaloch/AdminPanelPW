import React from 'react';
import axios from 'axios';

export default function Verification() {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/others/verification'
      );
      console.log(response);
    } catch (error) {
      console.error('Error retrieving collection:', error);
    }
  };
  fetchData();
  return <div>Verification</div>;
}
