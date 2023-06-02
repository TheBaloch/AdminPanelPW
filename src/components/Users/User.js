import React from 'react';

export default function User(user) {
  console.log(user);
  const u = user.user;
  return (
    <div>
      <p>First Name: {u.f_name}</p>
      <p>Last Name: {u.l_name}</p>
      <p>Email: {u.email}</p>
      <p>Phone: {u.phone}</p>
    </div>
  );
}
