import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Verify from './Verify';

export default function Verification() {
  const [verify, setVerify] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/others/verification'
        );
        setVerify(response.data);
      } catch (error) {
        console.error('Error retrieving collection:', error);
      }
    };

    fetchData();
  }, []);

  if (!verify)
    return (
      <>
        <h1>Loading......</h1>
      </>
    );
  return (
    <>
      {verify.map((verify) => (
        <Verify key={verify.id} verify={verify} />
      ))}
    </>
  );
}
