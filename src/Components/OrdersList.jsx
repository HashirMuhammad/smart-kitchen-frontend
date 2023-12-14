import React, { useState, useEffect } from "react";
import Footer from "./Header/Footer";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router";
import pic from "../assets/download (1).jpg";

const OrdersList = () => {
  const [orders, setOrders] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (!data.orders || !Array.isArray(data.orders)) {
          console.error("Expected an array of orders, but received:", data);
          return;
        }

        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        display: "flex",
        flexWrap: "wrap",
      }}
      color={"white"}
    >
      <Grid
        item
        lg={12}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        m={2}
      >
        <Typography variant="h2">Chef Home Page</Typography>
        <Grid display={"flex-end"}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
            style={{
              backgroundColor: "#FF0000",
              marginLeft: "10px",
              color: "white",
            }}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
      <Box display={"flex"} justifyContent={"center"} p={4}>
        {orders ? (
          <ul>
            {orders.map((order) => (
              <li key={order._id}>
                <Card variant="outlined">
                  <CardContent
                    sx={{ backgroundColor: "black", color: "white" }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={"700"}>
                        Order ID:
                      </Typography>
                      <Typography variant="body1"> {order._id} </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body1" fontWeight={"700"}>
                        Time:
                      </Typography>
                      <Typography variant="body1"> {order.time} </Typography>
                    </Box>

                    <h2>Menu Items Info</h2>
                    <ul>
                      {Array.isArray(order.menuItemsInfo) &&
                        order.menuItemsInfo.map((menuInfo) => (
                          <li key={menuInfo.id}>
                            <Box>
                              <Typography variant="body1" fontWeight={"700"}>
                                Name:
                              </Typography>
                              <Typography variant="body1">
                                {menuInfo.name}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body1" fontWeight={"700"}>
                                Quantity:
                              </Typography>
                              <Typography variant="body1">
                                {menuInfo.quantity}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="body1" fontWeight={"700"}>
                                Address:
                              </Typography>
                              <Typography variant="body1">
                                {menuInfo.address}
                              </Typography>
                            </Box>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading orders...</p>
        )}
      </Box>
      <Footer />
    </Grid>
  );
};

export default OrdersList;
