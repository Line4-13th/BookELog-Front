// StarRatings.jsx
import React from "react";
import "./StarRatings.scss";

const StarRatings = ({ rating }) => {
  const fullStars = Math.floor(rating); // 채워진 별의 개수
  const hasHalfStar = rating % 1 >= 0.5; // 반 별 여부
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // 빈 별 개수

  return (
    <div className="star-ratings">
      {/* 채워진 별 */}
      {Array(fullStars)
        .fill()
        .map((_, index) => (
          <span key={`full-${index}`} className="star full">
            ★
          </span>
        ))}

      {/* 반 별 */}
      {hasHalfStar && <span className="star half">☆</span>}

      {/* 빈 별 */}
      {Array(emptyStars)
        .fill()
        .map((_, index) => (
          <span key={`empty-${index}`} className="star empty">
            ☆
          </span>
        ))}
    </div>
  );
};

export default StarRatings;
