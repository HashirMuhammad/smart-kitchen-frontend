import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';

const FeedbackForm = ({  }) => {
  const [feedbackData, setFeedbackData] = useState({
    feedback: '',
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

  const handleSubmitFeedback = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/feedback/${localStorage.getItem('orderId')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(feedbackData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Handle successful feedback submission, e.g., show a success message
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error.message);
    }
  };

  return (
    <div>
      <h1>Submit Feedback</h1>
      <form>
        <label>
          Feedback:
          <textarea
            name="feedback"
            value={feedbackData.feedback}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Rating:
          <Rating
            count={5}
            size={24}
            onChange={handleRatingChange}
            value={feedbackData.rating}
          />
        </label>
        <br />
        <button type="button" onClick={handleSubmitFeedback}>
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
