import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import logo from "../assets/smartkitchen.jpg";
import pic from "../assets/download (1).jpg";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await LoginSchema.validate({ email, password }, { abortEarly: false });

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
      if (error.name === "ValidationError") {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error during login:", error.message);
      }
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
            <img src={logo} alt="" srcSet="" />
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
          required
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
          required
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
