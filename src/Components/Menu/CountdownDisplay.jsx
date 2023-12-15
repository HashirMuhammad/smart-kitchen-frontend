import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

const CountdownDisplay = () => {
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerFound, setTimerFound] = useState(false);

  useEffect(() => {
    // Retrieve countdown timer ID and start time from local storage
    const countdownTimerId = JSON.parse(localStorage.getItem('countdownTimerId'));
    const startTime = JSON.parse(localStorage.getItem('countdownStartTime'));

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
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      {timerFound && (
        <Typography variant="h6">Remaining Time: {formatTime(remainingTime)}</Typography>
      )}
    </div>
  );
};

export default CountdownDisplay;
