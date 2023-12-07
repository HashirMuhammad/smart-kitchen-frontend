import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";

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
    <Container>
      <Typography variant="h4">Add Menu Item</Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Image URL"
        value={imgUrl}
        onChange={(e) => setImgUrl(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAddMenuItem}>
        Add Menu Item
      </Button>
    </Container>
  );
}

export default AddMenuItem;
