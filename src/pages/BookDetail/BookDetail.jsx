import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookDetail.scss";
import BackButton from "../../assets/BackButton.svg";
import OneSentence from "../../components/ReviewPage/OneSentence";
import Question from "../../components/ReviewPage/Question";
import StarRatings from "../../components/ReviewPage/StarRatings";
import axios from "axios";
import BASE_URL from "../../../API_URL"; // API URL

const BookDetail = () => {
  const navigate = useNavigate();
  const { book_id } = useParams(); // URL에서 book_id 가져오기

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 모달 상태와 별점 선택 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewContent, setReviewContent] = useState(""); // ✨ 리뷰 내용 추가

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/books/bookdetail/${book_id}/`
        );
        setBook(response.data);
        setReviews(response.data.reviews);
        calculateRatingStats(response.data.reviews);
        setError(null);
      } catch (err) {
        console.error("책 상세 정보를 불러오는 중 오류 발생:", err);
        setError("책 상세 정보를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [book_id]);

  const calculateRatingStats = (reviews) => {
    if (!reviews || reviews.length === 0) return;

    const totalRatings = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    setAverageRating((totalRatings / reviews.length).toFixed(1));
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSelection = (index) => {
    setSelectedItem(index);
  };

  // ✨ 리뷰 및 별점 POST 요청
  const postRating = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // 인증 토큰 추가
      };

      const requestBody = {
        username: "사용자 이름", // 실제 사용자 이름 입력
        rating: selectedRating,
        content: reviewContent, // 작성한 리뷰 내용
      };

      await axios.post(
        `${BASE_URL}/api/books/bookdetail/${book_id}/review/`,
        requestBody,
        { headers }
      );

      alert("리뷰와 별점이 저장되었습니다!");
      setIsModalOpen(false);
      setReviewContent(""); // 리뷰 입력 초기화
      setSelectedRating(0); // 별점 초기화

      // 새 데이터 가져오기
      const response = await axios.get(
        `${BASE_URL}/api/books/bookdetail/${book_id}/`
      );
      setReviews(response.data.reviews);
      calculateRatingStats(response.data.reviews);
    } catch (error) {
      console.error("리뷰 저장 중 오류 발생:", error);
      alert("리뷰 저장에 실패했습니다.");
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="whole">
      <button className="back-button" onClick={goBack}>
        <img src={BackButton} alt="뒤로가기" />
      </button>

      <div className="whole-container">
        {book && (
          <>
            <div className="bookdetail-container">
              <div className="left">
                <div className="book-cover">
                  <img
                    className="book-cover-img"
                    src={book.cover_image}
                    alt={book.title}
                  />
                </div>
              </div>

              <div className="whole-right">
                <div className="right">
                  <div className="book-details">
                    <h2>{`《${book.title}》`}</h2>
                    <p className="author-info">{`${book.author}`}</p>
                    <p className="publication-info">{`${book.publisher} | ${book.date}`}</p>
                    <div className="star-container">
                      <StarRatings rating={averageRating} />
                      <button
                        className="star-button"
                        onClick={() => setIsModalOpen(true)}
                      >
                        별점 주기
                      </button>
                    </div>
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="purchase-button">구매하기</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="segmented-control">
              <button
                className={selectedItem === 0 ? "active" : ""}
                onClick={() => handleSelection(0)}
              >
                한 줄 리뷰
              </button>
              <button
                className={selectedItem === 1 ? "active" : ""}
                onClick={() => handleSelection(1)}
              >
                책 소개
              </button>
              <button
                className={selectedItem === 2 ? "active" : ""}
                onClick={() => handleSelection(2)}
              >
                Q&A
              </button>
            </div>

            {selectedItem === 0 && (
              <div>
                <div className="overay">
                  <input
                    className="review"
                    placeholder="당신의 한 줄 리뷰를 남겨주세요!"
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        postRating(); // 엔터 키 입력 시 리뷰 저장
                      }
                    }}
                    // ✨ 리뷰 내용 설정
                  />
                </div>
                <div className="onesentence-list">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <OneSentence
                        key={review.id}
                        userName={review.user}
                        reviewText={review.content}
                        rating={review.rating}
                      />
                    ))
                  ) : (
                    <p>첫 리뷰를 등록해주세요!</p>
                  )}
                </div>
              </div>
            )}
            {selectedItem === 1 && (
              <div className="iintroduction">
                <p className="iintroduction-p">{book.description}</p>
              </div>
            )}

            {selectedItem === 2 && <Question />}

            {/* 별점 모달 */}
            {isModalOpen && (
              <div
                className="modal-overlay"
                onClick={() => setIsModalOpen(false)}
              >
                <div
                  className="star-modal-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2 className="star-number">별점 주기</h2>
                  <div className="star-span">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setSelectedRating(star)}
                        style={{
                          cursor: "pointer",
                          fontSize: "24px",
                          color: star <= selectedRating ? "gold" : "gray",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div>
                    <button onClick={postRating} className="star-submit-button">
                      저장
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="star-close-button"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
