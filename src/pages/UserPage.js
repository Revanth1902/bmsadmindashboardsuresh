import React, { useState, useEffect } from "react";
import { fetchUsers, deleteUser } from "../services/userService";
import { Button, Table } from "react-bootstrap"; // Import Bootstrap components
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for delete action

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const usersData = await fetchUsers();
      setUsers(usersData);
    };
    loadUsers();
  }, []);

  const handleDelete = async (userId) => {
    await deleteUser(userId);
    setUsers(users.filter((user) => user.userId !== userId)); // Fix: Ensure correct property name
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 text-primary">Users</h1>
      <Table striped bordered hover responsive>
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              {" "}
              {/* Use _id since the response has _id */}
              <td>{user._id}</td> {/* Display the user ID */}
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                  className="d-flex align-items-center"
                >
                  <FaTrashAlt style={{ marginRight: "8px" }} />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UsersPage;
