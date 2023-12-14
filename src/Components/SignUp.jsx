import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import logo from "../assets/smartkitchen.jpg";
import pic from "../assets/download (1).jpg";
import { useNavigate } from "react-router";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Signup successful:", data);
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error.message);
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
              onClick={handleSignup}
            >
              Log in
            </Button>
          </Box>
        </Box>
        <Typography variant="h4">SignUp</Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        boxShadow={2}
        borderRadius={3}
        alignItems={"center"}
      >
        <Box px={2}>
          <TextField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        </Box>
        <Box px={2}>
          <TextField
            label="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required="true"
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
          />
        </Box>
        <Box px={2}>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required="true"
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
          />
        </Box>
      </Box>
      <Box my={2} py={2} display={"flex"} justifyContent={"center"}>
        <Button
          style={{ backgroundColor: "#FF0000", color: "white" }}
          onClick={handleSignup}
        >
          Log in{" "}
        </Button>
      </Box>
    </Box>
  );
}

export default Signup;
