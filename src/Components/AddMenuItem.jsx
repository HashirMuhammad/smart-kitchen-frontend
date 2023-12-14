import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import pic from "../assets/download (1).jpg";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

import pic1 from "../assets/Food3.jpg";
import Footer from "./Header/Footer";

function AddMenuItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();

  const handleAddMenuItem = async () => {

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3000/menu/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          name,
          price,
          imgUrl,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Menu item added successfully:", data);
    } catch (error) {
      console.error("Error adding menu item:", error.message);
    }
    
  };

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
      }}
      color={"white"}
    >
      <Grid item lg={12} display={"flex"} mx={4} alignItems={"center"}>
        <ArrowBackIcon
          sx={{ cursor: "pointer" }}
          color="white"
          onClick={() => {
            navigate("/user-list");
          }}
        />
        <Typography variant="h2">Add Menu Items</Typography>
      </Grid>
      <Grid item lg={6} mt={5} py={5} color={"white"}>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            margin="normal"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} color={"white"}>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
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
            margin="normal"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
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
            margin="normal"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} py={3}>
          <Button
            sx={{ backgroundColor: "#FF0000", color: "white" }}
            onClick={handleAddMenuItem}
          >
            Add Menu Item
          </Button>
        </Box>
      </Grid>
      <Grid lg={6} py={2}>
        <img src={pic1} alt="" style={{ borderRadius: "50px" }} srcset="" />
      </Grid>
      <Footer />
    </Grid>
  );
}

export default AddMenuItem;
