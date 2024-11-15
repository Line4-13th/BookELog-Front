// StarRatings.jsx
import React, { useState } from "react";
import "./StarRatings.scss";

const StarRatings = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(null);

  const handleClick = (newRating) => {
    if (onRatingChange) onRatingChange(newRating); // 부모 컴포넌트로 선택된 별점 전달
  };

  return (
    <div className="star-ratings">
      {Array(5)
        .fill()
        .map((_, index) => {
          const currentRating = index + 1;
          return (
            <span
              key={index}
              className={`star ${
                currentRating <= (hoverRating || rating) ? "full" : "empty"
              }`}
              onMouseEnter={() => setHoverRating(currentRating)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleClick(currentRating)}
            >
              ★
            </span>
          );
        })}
    </div>
  );
};

export default StarRatings;
