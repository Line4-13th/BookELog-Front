// src/pages/Home/MyReviewPage.jsx
// src/pages/Home/MyReviewPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../../API_URL';
import './MyReviewPage.scss';

const MyReviewPage = () => {
  const navigate = useNavigate();

  // Initial example reviews as placeholder data
  const exampleReviews = [
    { id: 1, book_title: '완전한 행복', content: '한 인간이 타인의 행복에 어떻게 관여하는지를 짜임새 있는 사건으로 풀어내는 이야기.', created_at: '2024-11-10T14:23:11Z' },
    { id: 2, book_title: '나는 소망한다 내게 금지된 것을', content: '2024년 대한민국에도 여전히 강인함이 필요하다.', created_at: '2024-11-09T10:45:30Z' },
    { id: 3, book_title: '칼타린, 리버 줌바', content: '제 최애는 오래된 나이프, 나이트입니다... #추천작', created_at: '2024-11-08T08:15:10Z' },
    { id: 4, book_title: '유명한 마음으로', content: '유령, 별, 해바라기, 나무, 그들과 함께하는 환상적인 이야기들.', created_at: '2024-11-07T16:02:45Z' },
  ];

  const [reviews, setReviews] = useState(exampleReviews); // Set initial state to example reviews

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/reviews/`);
        setReviews(response.data); // Replace example reviews with API data
      } catch (error) {
        console.error('Error fetching reviews:', error);
        alert('리뷰를 불러오는 데 실패했습니다.');
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-container">
      <header className="review-header">
        <button onClick={() => navigate(-1)}>&larr;</button>
        <h2>내가 남긴 한 줄 리뷰</h2>
      </header>
      <div className="review-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p className="review-title"><strong>《{review.book_title}》</strong></p>
            <p className="review-content">“ {review.content} ”</p>
            <p className="review-date">{new Date(review.created_at).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviewPage;



