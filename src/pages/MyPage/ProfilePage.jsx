// src/pages/Home/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../API_URL";
import "./ProfilePage.scss";
import defaultProfileIcon from "../../assets/default-profile-icon.png";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    return savedUserData?.nickname || "허니와 클로버";
  });

  const [profileImage, setProfileImage] = useState(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    return savedUserData?.profileImage || defaultProfileIcon;
  });

  const [reviews, setReviews] = useState([]);
  const [qnaRecords, setQnaRecords] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [loadingQna, setLoadingQna] = useState(true);
  const [errorReviews, setErrorReviews] = useState(null);
  const [errorQna, setErrorQna] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/mypage/reviews/`);
        setReviews(response.data);
        setErrorReviews(null);
      } catch (err) {
        console.error("리뷰 데이터를 불러오는 중 오류 발생:", err);
        setErrorReviews("리뷰 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoadingReviews(false);
      }
    };

    const fetchQnaRecords = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/mypage/questions/`);
        setQnaRecords(response.data);
        setErrorQna(null);
      } catch (err) {
        console.error("Q&A 데이터를 불러오는 중 오류 발생:", err);
        setErrorQna("Q&A 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoadingQna(false);
      }
    };

    fetchReviews();
    fetchQnaRecords();
  }, []);

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

  const goToReviewPage = () => navigate("/review");
  const goToQnAPage = () => navigate("/qna");

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-info">
          <div className="profile-picture">
            <img src={profileImage} alt="Profile Icon" />
            <label
              htmlFor="image-upload"
              className="add-button"
              onClick={(e) => e.stopPropagation()}
            >
              +
            </label>
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
          {loadingReviews ? (
            <p>로딩 중...</p>
          ) : errorReviews ? (
            <p>{errorReviews}</p>
          ) : reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-card">
                <p>
                  <strong>《{review.book_title}》</strong>
                </p>
                <p>“ {review.content} ”</p>
                <p className="review-date">
                  작성일: {new Date(review.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p>작성된 리뷰가 없습니다.</p>
          )}
        </div>
      </section>

      {/* Scrollable Q&A section */}
      <section className="qa-section">
        <h3 onClick={goToQnAPage}>Q&A 기록 &gt;</h3>
        <div className="qa-card-container">
          {loadingQna ? (
            <p>로딩 중...</p>
          ) : errorQna ? (
            <p>{errorQna}</p>
          ) : qnaRecords.length > 0 ? (
            qnaRecords.map((qna) => (
              <div key={qna.id} className="qa-card">
                <div className="question">
                  <p>
                    <strong>Q</strong> {qna.question}
                  </p>
                </div>
                <div className="answer">
                  <p>
                    <strong>A</strong> {qna.answer || "아직 답변이 없습니다."}
                  </p>
                  <p className="qa-date">
                    작성일: {new Date(qna.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>등록된 Q&A가 없습니다.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;





























