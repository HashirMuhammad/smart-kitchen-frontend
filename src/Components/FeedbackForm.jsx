import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Rating from "react-rating-stars-component";
import pic from "../assets/download (1).jpg";
import pic0 from "../assets/Food3.jpg";
import { useNavigate } from "react-router";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "./Header/Footer";

const FeedbackForm = () => {
  const [feedbackData, setFeedbackData] = useState({
    feedback: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (newRating) => {
    setFeedbackData({
      ...feedbackData,
      rating: newRating,
    });
  };
  const navigate = useNavigate();

  const handleSubmitFeedback = async () => {
    navigate("/");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/feedback/${localStorage.getItem("orderId")}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful feedback submission, e.g., show a success message
      console.log("Feedback submitted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }
  };

  return (
    <Grid
      container
      sx={{
        backgroundImage: `url(${pic})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
      color={"white"}
    >
      <Grid item lg={12} display={"flex"} mx={4} alignItems={"center"}>
        <ArrowBackIcon
          sx={{ cursor: "pointer" }}
          color="white"
          onClick={() => {
            navigate("/");
          }}
        />
        <Typography variant="h2">FeedBack</Typography>
      </Grid>
      <Grid
        item
        lg={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form color="white">
          <FormControl sx={{ width: "400", color: "white" }}>
            <FormLabel sx={{ color: "white" }}>Feedback:</FormLabel>
            <TextareaAutosize
              name="feedback"
              value={feedbackData.feedback}
              onChange={handleInputChange}
              rowsMin={4}
              fullwidth
              style={{
                width: "100%",
                resize: "vertical",
                marginBottom: "10px",
              }}
            />
          </FormControl>
          <br />
          <FormControl sx={{ width: "400", color: "white" }} mt={2}>
            <FormLabel sx={{ color: "white" }}>Rating:</FormLabel>
            <Rating
              count={5}
              size={40}
              onChange={handleRatingChange}
              value={feedbackData.rating}
            />
          </FormControl>
          <br />

          <Button
            mt={2}
            style={{ backgroundColor: "#FF0000", color: "white" }}
            onClick={handleSubmitFeedback}
          >
            Submit Feedback{" "}
          </Button>
        </form>
      </Grid>
      <Grid item lg={6}>
        <img src={pic0} style={{ borderRadius: "50px" }} alt="" />
      </Grid>
      <Footer />
    </Grid>
  );
};

export default FeedbackForm;
