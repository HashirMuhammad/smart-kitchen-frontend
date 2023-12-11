import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Header from "./Header/Header";
import pic from "../assets/bg.jpg";
import Food from "../assets/Food3.jpg";
import { useNavigate } from 'react-router';


const Order = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [orderDetails, setOrderDetails] = useState({
    menuIds: [],
    deliveryType: "pickup",
  });
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItems((prevSelected) => {
      const isSelected = prevSelected[itemId];
      const updatedSelection = { ...prevSelected, [itemId]: !isSelected };
      return updatedSelection;
    });
  };

  const handleQuantityChange = (itemId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const handleDeliveryTypeChange = (event) => {
    setOrderDetails({ ...orderDetails, deliveryType: event.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      // Construct the menuIds array with quantities
      const updatedMenuIds = Object.keys(quantities).flatMap((itemId) => {
        const menuId = itemId; // Assuming menuId is the same as itemId
        const quantity = quantities[itemId];
        return Array.from({ length: quantity }, () => ({
          menuId,
          quantity: 1,
        }));
      });

      const updatedOrderDetails = { ...orderDetails, menuIds: updatedMenuIds };

      const response = await fetch("http://localhost:3000/order/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(updatedOrderDetails),
      });

      console.log("Request Data:", updatedOrderDetails);

      if (!response.ok) {
        console.error("Error response:", response);
        // Handle error if needed
      } else {
        const responseData = await response.json();
        const orderId = responseData.order?._id;

        // Log the order ID
        console.log("Order placed successfully. Order ID:", orderId);
        // Save the order ID in local storage
        localStorage.setItem("orderId", orderId);
        navigate('/order-details');

        // Handle other success actions if needed
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;

    // Iterate through selected items and calculate the total amount
    Object.keys(selectedItems).forEach((itemId) => {
      if (selectedItems[itemId]) {
        const quantity = quantities[itemId] || 1; // If quantity is not provided, default to 1
        const selectedItem = menuData.find((item) => item._id === itemId);

        if (selectedItem) {
          totalAmount += quantity * selectedItem.price;
        }
      }
    });

    return totalAmount;
  };

  const totalAmount = calculateTotalAmount();

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
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h2">Orders</Typography>
        </Box>
      </Box>
      <Grid item lg={6} display={"flex"} justifyContent={"center"} py={3}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {menuData.map((item) => (
            <Card
              key={item._id}
              sx={{ width: 200, margin: 1, cursor: "pointer" }}
              onClick={() => handleItemClick(item._id)}
              className={selectedItems[item._id] ? "selected" : ""}
            >
              <CardMedia
                component="img"
                height="140"
                image={item.imgUrl}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2">${item.price}</Typography>
                {selectedItems[item._id] && (
                  <TextField
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                    value={quantities[item._id] || ""}
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Box mt={2}>
          <Box display={"flex"} justifyContent={"center"} mt={3}>
            <Typography variant="h4">Order Details</Typography>
          </Box>
          <FormControl sx={{ width: 300 , marginTop:3 }}  >
            <label id="delivery-type-label">Delivery Type</label>
            <Select
              labelId="delivery-type-label"
              value={orderDetails.deliveryType}
              onChange={handleDeliveryTypeChange}
            >
              <MenuItem value="pickup">Pickup</MenuItem>
              <MenuItem value="delivery">Delivery</MenuItem>
              <MenuItem value="dinein">Dine-in</MenuItem>
            </Select>
          </FormControl>

          <Box mt={3} mx={3} >
            <Typography variant="h5">
              Total Amount: ${totalAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePlaceOrder}
              style={{
                marginTop: "20px",
                backgroundColor: "#FF0000",
              }}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item lg={6}>
        <img src={Food} style={{borderRadius:'50px'}} alt="" />
      </Grid>
    </Grid>
  );
};

export default Order;
