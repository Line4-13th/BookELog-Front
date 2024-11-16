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
  const [user, setUser] = useState(null); // 로그인된 사용자 정보

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

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    console.log("localStorage에서 가져온 userData:", storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("파싱된 사용자 정보:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("userData 파싱 중 오류 발생:", error);
        setUser(null); // 파싱 오류 시 null로 설정
      }
    } else {
      console.warn("localStorage에 userData가 없습니다.");
      setUser(null); // userData가 없을 때 null로 설정
    }
    setLoading(false);
  }, []);

  // ✨ 리뷰 및 별점 POST 요청
  const postRating = async () => {
    if (!reviewContent.trim()) {
      alert("별점이 저장되었습니다.");
      return;
    }

    if (!user || !user.userId) {
      alert("사용자 정보를 찾을 수 없습니다. 로그인 해주세요.");
      return;
    }

    console.log("POST 요청 payload:", {
      username: user.userId, // 로컬 스토리지에서 가져온 사용자 이름
      rating: selectedRating, // 선택된 별점
      content: reviewContent, // 작성한 리뷰 내용
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/books/bookdetail/${book_id}/review/`,
        {
          username: user.userId, // 실제 사용자 이름을 로컬 스토리지에서 가져오기
          rating: selectedRating, // 별점
          content: reviewContent, // 리뷰 내용
        }
      );
      console.log("New review submitted:", response.data);

      alert("리뷰와 별점이 저장되었습니다!");
      setIsModalOpen(false);
      setReviewContent(""); // 리뷰 내용 초기화
      setSelectedRating(0); // 별점 초기화

      // 새 데이터 가져오기 (리뷰 목록과 평균 별점 업데이트)
      const bookResponse = await axios.get(
        `${BASE_URL}/api/books/bookdetail/${book_id}/`
      );
      setReviews(bookResponse.data.reviews); // 새로 받아온 리뷰 리스트로 업데이트
      calculateRatingStats(bookResponse.data.reviews); // 평균 별점 계산
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
