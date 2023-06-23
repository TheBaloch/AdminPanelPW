import React from 'react';

export default function User(user) {
  const u = user.user;
  return (
    <div className="card w-auto">
      <div className="row">
        <div className="col">
          <p>
            {u.f_name} {u.l_name}
          </p>
        </div>
        <div className="col">
          <p>{u.email}</p>
        </div>
        <div className="col">
          <p>{u.phone}</p>
        </div>
      </div>
    </div>
  );
}
