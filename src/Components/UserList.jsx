import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      const response = await fetch('http://localhost:3000/admin/users', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);

      // Get the user's role from the data
      const user = data.find(user => user.role === 'admin'); // Assuming there is only one admin in the list
      setUserRole(user ? 'admin' : 'non-admin');
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeRole = async (userId) => {
    try {
      const newRole = prompt('Enter the new role (client, admin, chef, rider):');

      if (!newRole || !['client', 'admin', 'chef', 'rider'].includes(newRole)) {
        console.error('Invalid role. Role must be one of: client, admin, chef, rider.');
        return;
      }

      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:3000/admin/change-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the user list after changing the role
      fetchUsers();
    } catch (error) {
      console.error('Error changing role:', error.message);
    }
  };

  return (
    <div>
      {userRole === 'admin' ? (
        <div>
          <h1>User List</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleChangeRole(user._id)}>Change Role</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <label>You are not authorized for this page.</label>
      )}
    </div>
  );
}

export default UserList;
