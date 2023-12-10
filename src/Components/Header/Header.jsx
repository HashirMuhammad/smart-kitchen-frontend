import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";
import logo from "../../assets/smartkitchen.jpg";
import MenuuData from "../Menu/Menudata";

const Header = () => {
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"}>
        <img src={logo} alt="" width={100} style={{ marginTop: "10px" }} />
        <Typography variant="h4">Menu</Typography>
        <Grid container mx={2} display={"flex"}>
          {MenuuData.map((item) => (
            <Box
              key={item.id}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box>
                <Link
                  to={item.link}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <Typography mx={2} variant="h5">
                    {item.name}
                  </Typography>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
        <Button variant="contained" style={{ backgroundColor: "#FF0000" }}>
          Order on Smart Kitchen
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
