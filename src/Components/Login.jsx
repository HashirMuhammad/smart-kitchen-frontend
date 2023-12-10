import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

import logo from "../assets/smartkitchen.jpg";
import pic from "../assets/bg.jpg";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      // Save the token to local storage
      localStorage.setItem("token", data.token);

      console.log("Login successful:", data);

      // Redirect or perform other actions after successful login
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <Box
    sx={{
      backgroundImage: `url(${pic})`,
      backgroundSize: "cover",
      height:'100vh'
    }}
  >
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
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
            style={{ backgroundColor: "#FF0000" }}
            onClick={handleLogin}
          >
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign Up
            </Link>
          </Button>
        </Box>
      </Box>
      <Typography variant="h4" >Log in</Typography>
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
            sx={{ width: 300 }}
            required="true"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            sx={{ width: 300 }}
            required="true"
          />
          
          <Box mx={2}>
          <Button
            style={{ backgroundColor: "#FF0000",color:'white' }}
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
