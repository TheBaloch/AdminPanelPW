import React from 'react';

export default function Verify(verify) {
  const v = verify.verify;

  console.log(v);
  return (
    <>
      <h1>Verification</h1>
      <img
        src={`http://localhost:5000/${v.image}`}
        alt="failed"
        style={{ width: '200px', height: '200px' }}
      />
    </>
  );
}
