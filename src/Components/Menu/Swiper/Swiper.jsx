import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import pic1 from "../../../assets/66ca6299-1b67-4090-bbc5-bd1f8921ab2a.jpg";
import pic2 from "../../../assets/download.jpg";
import pic3 from "../../../assets/Vell Interiors & Appliacnes _ Gallery _ Photo Gallery.jpg";
import pic4 from "../../../assets/Gallery of CoMED _ ad2 architekten ZT KG  - 20.jpg";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Box } from "@mui/material";

export default function SwiperMac() {
  return (
    <Box>
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
    </Box>
  );
}
