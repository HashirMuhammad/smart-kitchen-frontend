import React, { useState } from "react";
import { TextField, Button, Typography, Box, Grid } from "@mui/material";
import Header from "../Components/Header/Header";
import pic from "../assets/bg.jpg";

import pic1 from "../assets/Food3.jpg";

function AddMenuItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  const handleAddMenuItem = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      const response = await fetch("http://localhost:3000/menu/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`, // Add the token to the Authorization header
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

      // Redirect or perform other actions after adding the menu item
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
        height: "100vh",
      }}
    >
      <Box>
        <Box>
          <Header />
        </Box>
        <Box display={"flex"} justifyContent={"center"} mt={3}>
          <Typography variant="h4">Add Menu Item</Typography>
        </Box>
      </Box>
      <Grid item lg={6} mt={5} py={5}>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: 400 }}
            margin="normal"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            sx={{ width: 400 }}
            margin="normal"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <TextField
            label="Image URL"
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            sx={{ width: 400 }}
            margin="normal"
          />
        </Box>
        <Box display={"flex"} justifyContent={"center"} py={3}>
          <Button sx={{backgroundColor:'#FF0000',color:"white"}}  onClick={handleAddMenuItem}>
            Add Menu Item
          </Button>
        </Box>
      </Grid>
      <Grid lg={6} py={2}>
        <img src={pic1} alt="" style={{ borderRadius: "50px" }} srcset="" />
      </Grid>
    </Grid>
  );
}

export default AddMenuItem;
