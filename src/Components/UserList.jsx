import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import Footer from "./Header/Footer";
import pic from "../assets/download (1).jpg";

function UserList() {
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3000/admin/users", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);

      const user = data.find((user) => user.role === "admin"); 
      setUserRole(user ? "admin" : "non-admin");
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeRole = async (userId) => {
    try {
      const newRole = prompt(
        "Enter the new role (client, admin, chef, rider):"
      );

      if (!newRole || !["client", "admin", "chef", "rider"].includes(newRole)) {
        console.error(
          "Invalid role. Role must be one of: client, admin, chef, rider."
        );
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/admin/change-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ userId, newRole }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      fetchUsers();
    } catch (error) {
      console.error("Error changing role:", error.message);
    }
  };

  const handleAddMenuItem = () => {
    navigate("/add-menu-item");
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
      }}
      color={"white"}
    >
      <Box>
        {userRole === "admin" ? (
          <div>
            <Box display={"flex"} justifyContent={"space-between"} p={3}>
              <Typography variant="h4">User List</Typography>
              <Button
                sx={{ backgroundColor: "#FF0000", color: "white" }}
                onClick={handleAddMenuItem}
                variant="contained"
                color="primary"
              >
                Add Menu Item
              </Button>
            </Box>
            <TableContainer sx={{ boxShadow: "4" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "Bold", color: "white" }}>
                      Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "Bold", color: "white" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: "Bold", color: "white" }}>
                      Role
                    </TableCell>
                    <TableCell sx={{ fontWeight: "Bold", color: "white" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell sx={{ color: "white" }}>{user.name}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        {user.email}
                      </TableCell>
                      <TableCell sx={{ color: "white" }}>{user.role}</TableCell>
                      <TableCell sx={{ color: "white" }}>
                        <Button
                          onClick={() => handleChangeRole(user._id)}
                          variant="outlined"
                          color="primary"
                          sx={{ backgroundColor: "#FF0000", color: "white" }}
                        >
                          Change Role
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <Typography variant="body1">
            You are not authorized for this page.
          </Typography>
        )}
      </Box>

      <Box mt={2}>
        <Footer />
      </Box>
    </Box>
  );
}

export default UserList;
