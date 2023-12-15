import { Box, Typography } from "@mui/material";
import React from "react";
import { FooterData, FooterData1, FooterData2 } from "./FooterData";

import pic from "../../assets/download (1).jpg";

function Footer() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        // width:'100%'
      }}
    >
      <Box display={"flex"} justifyContent={"space-between"} color={'white'}>
        {FooterData().map((item) => {
          return (
            <Box key={item.id} mx={17} py={5}>
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box display={"flex"} color={'white'} >
        {FooterData1().map((item) => {
          return (
            <Box key={item.id} mx={16.5} py={3}>
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} color={'white'}>
        {FooterData2().map((item) => {
          return (
            <Box key={item.id} mx={16} py={5}>
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Footer;
