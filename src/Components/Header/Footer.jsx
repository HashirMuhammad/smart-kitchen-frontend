import { Box, Typography } from "@mui/material";
import React from "react";
import { FooterData, FooterData1, FooterData2 } from "./FooterData";

function Footer() {
  return (
    <Box>
      <Box display={"flex"} justifyContent={"space-between"}>
        {FooterData().map((item) => {
          return (
            <Box key={item.id} mx={17} py={5}>
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box display={"flex"}>
        {FooterData1().map((item) => {
          return (
            <Box key={item.id} mx={16.5} py={3}>
              <Typography>{item.name}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box display={"flex"} justifyContent={"space-between"}>
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
