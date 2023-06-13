import React from 'react';

export default function User(user) {
  console.log(user);
  const u = user.user;
  return (
    <div className="card">
      <div className="card-body">
        <p className="card-text">First Name: {u.f_name}</p>
        <p className="card-text">Last Name: {u.l_name}</p>
        <p className="card-text">Email: {u.email}</p>
        <p className="card-text">Phone: {u.phone}</p>
      </div>
    </div>
  );
}
