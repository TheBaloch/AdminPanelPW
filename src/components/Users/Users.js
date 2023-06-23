import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users`
        );
        setUsers(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="card w-auto">
        <div className="row">
          <div className="col">
            <strong>Name</strong>
          </div>
          <div className="col">
            <strong>Email</strong>
          </div>
          <div className="col">
            <strong>Phone</strong>
          </div>
        </div>
      </div>

      {users.map((user) => (
        <User key={user._id} user={user} />
      ))}
    </div>
  );
}
