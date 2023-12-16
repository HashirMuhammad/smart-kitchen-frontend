import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import logo from "../assets/smartkitchen.jpg";
import pic from "../assets/download (1).jpg";
import { useNavigate } from "react-router";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
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
    },
  });

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
              onClick={() => navigate("/login")}
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
        <form onSubmit={formik.handleSubmit}>
          <Box px={2}>
            <TextField
              label="Name"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              margin="normal"
              sx={{
                width: 300,
                color: "white",
                border: "1px solid white",
              }}
              required
            />
          </Box>
          <Box px={2}>
            <TextField
              label="Email"
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              margin="normal"
              sx={{
                width: 300,
                color: "white",
                border: "1px solid white",
              }}
              required
            />
          </Box>
          <Box px={2}>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              margin="normal"
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{ style: { color: "white" } }}
              sx={{
                width: 300,
                color: "white",
                border: "1px solid white",
              }}
              required
            />
          </Box>
          <Box my={2} py={2} display={"flex"} justifyContent={"center"}>
            <Button
              type="submit"
              style={{ backgroundColor: "#FF0000", color: "white" }}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
