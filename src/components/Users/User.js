import React from 'react';

export default function User(user) {
  const u = user.user;
  return (
    <div className="card w-100">
      <div className="row">
        <div className="col mb-3">
          <p>
            {u.f_name} {u.l_name}
          </p>
        </div>
        <div className="col mb-3">
          <p>{u.email}</p>
        </div>
        <div className="col mb-3">
          <p>{u.phone}</p>
        </div>
      </div>
    </div>
  );
}
