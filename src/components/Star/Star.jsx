import { useState } from "react";
import "./Star.scss";

const StarRating = () => {
  const [rating, setRating] = useState(0); // 사용자가 선택한 별점
  const [hover, setHover] = useState(0); // 사용자가 현재 마우스로 hover 중인 별

  return (
    <div style={{ display: "flex" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            color: star <= (hover || rating) ? "gold" : "gray", // hover 시 gold
            fontSize: "24px",
          }}
          onClick={() => setRating(star)} // 별 클릭 시 rating 설정
          onMouseEnter={() => setHover(star)} // hover 상태 설정
          onMouseLeave={() => setHover(0)} // hover 해제 시 초기화
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
