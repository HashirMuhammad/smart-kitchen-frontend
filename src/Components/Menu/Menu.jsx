import React, { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import SwiperMac from "./Swiper/Swiper";
import Footer from "../Header/Footer";
import Header from "../Header/Header";
import pic from "../../assets/bg.jpg";
const MenuComponent = () => {
  const [menuData, setMenuData] = useState([]);

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

  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Header />
      </Box>

      <Box my={2}>
        <SwiperMac />
      </Box>
      <Grid container spacing={3}>
        {menuData.map((item) => (
          <Grid key={item._id} item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={item.name}
                height="140"
                image={item.imgUrl}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ${item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Footer />
      </Grid>
    </Box>
  );
};

export default MenuComponent;
