import React from 'react';

export default function Verify(verify) {
  const v = verify.verify;

  console.log(v);
  return (
    <>
      <h1>Verification</h1>
      <img
        src={`${process.env.REACT_APP_API_URL}/${v.image}`}
        alt="failed"
        style={{ width: '200px', height: '200px' }}
      />
    </>
  );
}
