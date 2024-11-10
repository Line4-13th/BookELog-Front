// src/pages/Home/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.scss';
import defaultProfileIcon from '../../assets/default-profile-icon.png';

const ProfilePage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(() => {
    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    return savedUserData?.nickname || '허니와 클로버';
  });

  const [profileImage, setProfileImage] = useState(() => {
    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    return savedUserData?.profileImage || defaultProfileIcon;
  });

  const handleImageUpload = (event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const goToReviewPage = () => navigate('/review');
  const goToQnAPage = () => navigate('/qna');

  const reviews = [
    { title: '완전한 행복', author: '정유정', content: '한 인간이 타인의 행복에 어떻게 관여하는지를 짜임새 있는 사건으로 풀어내는 이야기.' },
    { title: '나는 소망한다 내게 금지된 것을', author: '양귀자', content: '2024년 대한민국에도 여전히 강인함이 필요하다.' },
    { title: '칼타린, 리버 줌바', author: '조연', content: '제 최애는 오래된 나이프, 나이트입니다... #추천작' },
    { title: '유명한 마음으로', author: '임석우', content: '유령, 별, 해바라기, 나무, 그들과 함께하는 환상적인 이야기들.' },
  ];

  const qnaRecords = [
    {
      question: '다른 독자분들 중에 책따라 영화따라 샌드위치 만들어 드셔보신 분 계신가요?',
      answer: '아메리카 셰프 쿠바 샌드위치 부분 보고 영화 따라 보다가 쿠바 샌드위치 만들어 먹어봤어요.',
      questioner: '별님',
      answerer: '금붕어님',
    },
    {
      question: '읽으면서 감동 받은 구절이 있으신가요?',
      answer: '저는 "삶은 짧고, 예술은 길다"라는 말이 와 닿았습니다.',
      questioner: '하늘님',
      answerer: '푸른바다님',
    },
    {
      question: '책에서 영감을 받은 여행지가 있나요?',
      answer: '모로코의 푸른 도시 셰프샤우엔에 가보고 싶어요.',
      questioner: '여행자님',
      answerer: '길잡이님',
    },
  ];

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-info">
          <div className="profile-picture">
            <img src={profileImage} alt="Profile Icon" />
            <label htmlFor="image-upload" className="add-button" onClick={(e) => e.stopPropagation()}>+</label>
            <input 
              type="file" 
              id="image-upload" 
              accept="image/*" 
              onChange={handleImageUpload} 
              hidden 
            />
          </div>
          <div className="profile-details">
            <h2>{nickname} 님</h2>
            <p>지금까지 읽은 책</p>
            <div className="stats">
              <div className="stat">
                <span>1</span>
                <p>day</p>
              </div>
              <div className="stat">
                <span>3</span>
                <p>month</p>
              </div>
              <div className="stat">
                <span>20</span>
                <p>year</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Scrollable review section */}
      <section className="review-section">
        <h3 onClick={goToReviewPage}>내가 남긴 한 줄 리뷰 &gt;</h3>
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p><strong>《{review.title}》</strong> {review.author}</p>
              <p>“ {review.content} ”</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scrollable Q&A section */}
      <section className="qa-section">
        <h3 onClick={goToQnAPage}>Q&A 기록 &gt;</h3>
        <div className="qa-card-container">
          {qnaRecords.map((qna, index) => (
            <div key={index} className="qa-card">
              <div className="question">
                <p><strong>Q</strong> {qna.question}</p>
                <span>{qna.questioner}</span>
              </div>
              <div className="answer">
                <p><strong>A</strong> {qna.answer}</p>
                <span>{qna.answerer}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;



























