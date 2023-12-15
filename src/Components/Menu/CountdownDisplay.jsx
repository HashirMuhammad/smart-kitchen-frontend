import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

const CountdownDisplay = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerFound, setTimerFound] = useState(false);

  useEffect(() => {
    // Retrieve countdown timer ID and start time from local storage
    const countdownTimerId = JSON.parse(
      localStorage.getItem("countdownTimerId")
    );
    const startTime = JSON.parse(localStorage.getItem("countdownStartTime"));

    if (countdownTimerId && startTime) {
      setTimerFound(true);

      const updateRemainingTime = () => {
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds
        const elapsedSeconds = currentTime - startTime;
        const initialTime = 45 * 60; // Initial time in seconds

        // Calculate remaining time
        const remainingSeconds = initialTime - elapsedSeconds;

        // Update the state with remaining time
        setRemainingTime(Math.max(0, remainingSeconds));
      };

      // Call the updateRemainingTime function every second
      const intervalId = setInterval(updateRemainingTime, 1000);

      // Return a cleanup function to clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    } else {
      setTimerFound(false);
    }
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box >
      {timerFound && (
        <Grid container>
          <Grid
            item
            lg={12}
            sx={{ width: 200 }}
            mt={3}
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography fontSize={40} fontWeight={900}>
              Order will receive in
              <Grid display={"flex"} justifyContent={"center"}>
                <Box border={"3px solid white"} p={2}>
                  {formatTime(remainingTime)}
                </Box>
              </Grid>
            </Typography>
          </Grid>
          <Typography variant="h6"></Typography>
        </Grid>
      )}
    </Box>
  );
};

export default CountdownDisplay;
