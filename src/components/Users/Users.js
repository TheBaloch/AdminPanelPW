import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div>
      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}
