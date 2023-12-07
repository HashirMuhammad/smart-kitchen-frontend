import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";

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
    <Container>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        my={3}
      >
        <Box>
          <Typography variant="h3">Welcome to Smart Kitchen</Typography>
        </Box>
        <Typography variant="h4">Login</Typography>
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
        <Box my={2} py={2} display={"flex"} justifyContent={"center"}>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
