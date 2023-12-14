import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useNavigate } from "react-router";

import logo from "../assets/smartkitchen.jpg";
import pic from "../assets/download (1).jpg";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);

      console.log("Login successful:", data);

      switch (data.user.role) {
        case "client":
          navigate("/");
          break;
        case "chef":
          navigate("/orders-list");
          break;
        case "rider":
          navigate("/rider-details");
          break;
        case "admin":
          navigate("/user-list");
          break;
        default:
          navigate("/default");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        color={"white"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box>
            <img src={logo} alt="" srcset="" />
          </Box>
          <Box>
            <Typography variant="h3">Welcome to Smart Kitchen</Typography>
          </Box>
          <Box mx={2}>
            <Button
              style={{ backgroundColor: "#FF0000", color: "white" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Typography variant="h4">Log in</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        boxShadow={1}
        borderRadius={3}
        alignItems={"center"}
      >
        <TextField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          sx={{
            width: 300,
            "& label": {
              color: "white",
            },
            "& input": {
              color: "white",
            },
            border: "1px solid white",
          }}
          required="true"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          sx={{
            width: 300,
            "& label": {
              color: "white",
            },
            "& input": {
              color: "white",
            },
            border: "1px solid white",
          }}
          required="true"
        />

        <Box mx={2}>
          <Button
            style={{ backgroundColor: "#FF0000", color: "white" }}
            onClick={handleLogin}
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
