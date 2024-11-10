// src/pages/Home/MyReviewPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyReviewPage.scss';

const MyReviewPage = () => {
  const navigate = useNavigate();

  const reviews = [
    { title: '완전한 행복', author: '정유정', content: '한 인간이 타인의 행복에 어떻게 관여하는지를 짜임새 있는 사건으로 풀어내는 이야기.' },
    { title: '나는 소망한다 내게 금지된 것을', author: '양귀자', content: '2024년 대한민국에도 여전히 강인함이 필요하다.' },
    { title: '칼타린, 리버 줌바', author: '조연', content: '제 최애는 오래된 나이프, 나이트입니다... #추천작' },
    { title: '유명한 마음으로', author: '임석우', content: '유령, 별, 해바라기, 나무, 그들과 함께하는 환상적인 이야기들.' },
  ];

  return (
    <div className="review-container">
      <header className="review-header">
        <button onClick={() => navigate(-1)}>&larr;</button>
        <h2>내가 남긴 한 줄 리뷰</h2>
      </header>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p className="review-title"><strong>《{review.title}》</strong> {review.author}</p>
            <p className="review-content">“ {review.content} ”</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviewPage;


