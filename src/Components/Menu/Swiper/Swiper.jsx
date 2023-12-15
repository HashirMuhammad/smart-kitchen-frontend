import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import pic from "../../../assets/download (1).jpg";
import pic1 from "../../../assets/download (2).jpg";
import pic2 from "../../../assets/download (3).jpg";
import pic3 from "../../../assets/download (4).jpg";
import pic4 from "../../../assets/download (5).jpg";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box, Grid } from "@mui/material";

export default function SwiperMac() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        backgroundColor: "transparent",
        height: "130vh",
      }}
    >
      <Grid container>
        <Grid item lg={12}>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            border={"1px solid black"}
          >
            <SwiperSlide>
              <img src={pic1} alt="" srcset="" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={pic2} alt="" srcset="" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={pic3} alt="" srcset="" width={"100%"} height={"100%"} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={pic4} alt="" srcset="" width={"100%"} height={"100%"} />
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Grid>
    </Box>
  );
}
