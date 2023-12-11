import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Rating from "react-rating-stars-component";
import Header from "./Header/Header";
import pic from "../assets/bg.jpg";
import pic0 from "../assets/Food3.jpg";
import { useNavigate } from 'react-router';


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
      navigate('/');
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
    >
      <Box>
        <Box>
          <Header />
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h4">Submit Feedback</Typography>
        </Box>
      </Box>
      <Grid
        item
        lg={5}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form>
          <FormControl sx={{ width: "400" }}>
            <FormLabel>Feedback:</FormLabel>
            <TextareaAutosize
              name="feedback"
              value={feedbackData.feedback}
              onChange={handleInputChange}
              rowsMin={4}
              style={{
                width: "100%",
                resize: "vertical",
                marginBottom: "10px",
              }}
            />
          </FormControl>
          <br />
          <FormControl sx={{ width: "400" }} mt={2}>
            <FormLabel>Rating:</FormLabel>
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
    </Grid>
  );
};

export default FeedbackForm;
