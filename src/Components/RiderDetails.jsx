import React, { useState, useEffect } from "react";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import { useNavigate } from "react-router";
import pic from "../assets/download (1).jpg";
import Footer from "./Header/Footer";

const RiderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/rider/${localStorage.getItem("orderId")}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setOrderData(data.order);
        console.log(data.order.address);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
      }}
      color={"white"}
    >
      <Grid item lg={12} display={"flex"} justifyContent={"space-between"} mt={3} mx={2}>
        <Typography variant="h4" gutterBottom>
          Rider Home Page
        </Typography>
        <Box >
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
        </Box>
      </Grid>

      {orderData ? (
        <Grid
          item
          p={4}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          flexWrap={"wrap"}
          m={2}
        >
          <Card variant="outlined">
            <CardContent sx={{ backgroundColor: "black", color: "white" }}>
              <Box>
                <Box>
                  <Typography variant="body1" fontWeight={"700"}>
                    Order ID:
                  </Typography>
                  <Typography variant="body1">{orderData._id}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={"700"}>
                    User ID:
                  </Typography>
                  <Typography variant="body1">{orderData.user}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={"700"}>
                    User Name:
                  </Typography>
                  <Typography variant="body1">{orderData.userName}</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={"700"}>
                    Delivery Type:
                  </Typography>
                  <Typography variant="body1">
                    {orderData.deliveryType}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body1" fontWeight={"700"}>
                    Time:
                  </Typography>
                  <Typography variant="body1">{orderData.time}</Typography>
                </Box>
              </Box>

              <Box display={"flex"} flexDirection={"column"} flexWrap={"wrap"}>
                {orderData.menuItemsInfo ? (
                  <Box>
                    <Box display={"flex"} justifyContent={"center"} m={2}>
                      <Typography variant="h5" gutterBottom>
                        Aggregated Menu Items Info
                      </Typography>
                    </Box>
                    <List>
                      {orderData.menuItemsInfo.map((menuItem, index) => (
                        <Box>
                          <ListItem key={index}>
                            <ListItemText
                              primary={`Menu Item Name: ${menuItem.name}`}
                              secondary={`Quantity: ${menuItem.quantity}`}
                            />
                          </ListItem>
                          <ListItem key={index}>
                            <ListItemText
                              primary={`Address: ${orderData.address}`}
                              secondary={`Address: ${orderData.address}`}
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemText
                              primary={`Quantity: ${menuItem.quantity}`}
                            />
                          </ListItem>
                        </Box>
                      ))}
                    </List>
                  </Box>
                ) : (
                  <Typography variant="body1" paragraph>
                    No menu items info available.
                  </Typography>
                )}
              </Box>

              {/* Add more details as needed */}
            </CardContent>
          </Card>
        </Grid>
      ) : (
        <CircularProgress />
      )}
      <Footer />
    </Grid>
  );
};

export default RiderDetails;
