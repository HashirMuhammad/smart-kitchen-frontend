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
import pic from "../../assets/download (1).jpg";
import { useNavigate } from "react-router";
import { Button } from "@mui/base";

import logo from "../../assets/smartkitchen.jpg";
import { MenuuData } from "./Menudata";
import { Link } from "react-router-dom";

const MenuComponent = () => {
  const [menuData, setMenuData] = useState([]);
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

  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        <img src={logo} alt="" width={100} style={{ marginTop: "10px" }} />
        <Grid
          container
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box>
            <Grid
              item
              lg={10}
              mx={2}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {MenuuData.map((item) => (
                <Box
                  key={item.id}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Box display={"flex"}>
                    <Link
                      to={item.link}
                      style={{
                        cursor: "pointer",
                        color: "white",
                        textDecoration: "none",
                      }}
                    >
                      <Box spacing={12}>
                        <Typography mx={10} variant="h5">
                          {item.name}
                        </Typography>
                      </Box>
                    </Link>
                  </Box>
                </Box>
              ))}
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#FF0000",
                  marginLeft: "10px",
                  color: "white",
                }}
              >
                Order on Smart Kitchen
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Box gap={2}>
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
            LogIn
          </Button>
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
      </Box>

      <Box my={2}>
        <SwiperMac />
      </Box>
      <Grid
        container
        spacing={3}
        sx={{
          backgroundImage: `url(${pic})`,
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        {menuData.map((item) => (
          <Grid key={item._id} item lg={4}>
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
