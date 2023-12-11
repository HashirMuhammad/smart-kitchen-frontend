import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./Header/Header";

import pic3 from "../assets/Vell Interiors & Appliacnes _ Gallery _ Photo Gallery.jpg";
import { useNavigate } from 'react-router';

import pic from "../assets/bg.jpg";
import Food from "../assets/Food3.jpg";

const OrderDetails = () => {
  const [orderUpdateData, setOrderUpdateData] = useState({
    address: "",
    phoneNumber: "",
    paymentImage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve order ID from local storage
    const orderId = localStorage.getItem("orderId");

    // You can set orderId in the state if needed
    // setOrderUpdateData({ ...orderUpdateData, orderId });
  }, []); // Run the effect only once when the component mounts

  const handleInputChange = (e) => {
    setOrderUpdateData({
      ...orderUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setOrderUpdateData({
          ...orderUpdateData,
          paymentImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateOrder = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/order/update/${localStorage.getItem("orderId")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(orderUpdateData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful order update, e.g., show a success message
      console.log("Order updated successfully");
      navigate('/feedback-form');
    } catch (error) {
      console.error("Error updating order:", error.message);
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
        <Box >
          <Header />
        </Box>
        <Box mt={4} display={"flex"} justifyContent={"center"}>
          <Typography variant="h4">Update Order</Typography>
        </Box>
      </Box>

      <Grid item lg={6} mt={3} py={4}>
        <form>
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              label="Address"
              sx={{ width: 400 }}
              margin="normal"
              name="address"
              value={orderUpdateData.address}
              onChange={handleInputChange}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              label="Phone Number"
              sx={{ width: 400 }}
              margin="normal"
              name="phoneNumber"
              value={orderUpdateData.phoneNumber}
              onChange={handleInputChange}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              type="file"
              sx={{ width: 400 }}
              margin="normal"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"} mt={2} >
            <Button
              variant="contained"
              color="primary"
              type="button"
              onClick={handleUpdateOrder}
              style={{ backgroundColor: "#FF0000" }}
              
            >
              Update Order
            </Button>
          </Box>
        </form>
      </Grid>
      <Grid item lg={6} mt={2}>
        <img src={Food} style={{borderRadius:'50px'}} alt="" srcset="" />
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
