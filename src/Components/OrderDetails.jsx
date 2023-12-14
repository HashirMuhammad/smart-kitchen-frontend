import React, { useState, useEffect } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import pic from "../assets/download (1).jpg";
import Food from "../assets/Food3.jpg";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "./Header/Footer";

const OrderDetails = () => {
  const [orderUpdateData, setOrderUpdateData] = useState({
    address: "",
    phoneNumber: "",
    paymentImage: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
  }, []);

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
    navigate("/feedback-form");
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

      console.log("Order updated successfully");
      navigate("/feedback-form");
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
      color={"white"}
    >
      <Grid item lg={12} display={"flex"} mx={4} alignItems={"center"}>
        <ArrowBackIcon
          sx={{ cursor: "pointer" }}
          color="white"
          onClick={() => {
            navigate("/");
          }}
        />
        <Typography variant="h2">UpdateOrders</Typography>
      </Grid>

      <Grid item lg={6} mt={3} py={4} color={"white"}>
        <form>
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              label="Address"
              sx={{ width: 400, backgroundColor: "white" }}
              margin="normal"
              name="address"
              value={orderUpdateData.address}
              onChange={handleInputChange}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              label="Phone Number"
              sx={{ width: 400, backgroundColor: "white" }}
              margin="normal"
              name="phoneNumber"
              value={orderUpdateData.phoneNumber}
              onChange={handleInputChange}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <TextField
              type="file"
              sx={{ width: 400, backgroundColor: "white" }}
              margin="normal"
              accept="image/*"
              onChange={handleFileChange}
            />
          </Box>
          <Box display={"flex"} justifyContent={"center"} mt={2}>
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
        <img src={Food} style={{ borderRadius: "50px" }} alt="" srcset="" />
      </Grid>
      <Footer />
    </Grid>
  );
};

export default OrderDetails;
