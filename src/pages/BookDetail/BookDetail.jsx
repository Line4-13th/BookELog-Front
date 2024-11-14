import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ✨ useParams 추가
import "./BookDetail.scss";
import BackButton from "../../assets/BackButton.svg";
import OneSentence from "../../components/ReviewPage/OneSentence";
import Question from "../../components/ReviewPage/Question";
import StarRatings from "../../components/ReviewPage/StarRatings";
import axios from "axios";
import BASE_URL from "../../../API_URL"; // API URL

const BookDetail = () => {
  const navigate = useNavigate();
  const { book_id } = useParams(); // ✨ URL에서 book_id 가져오기

  const [book, setBook] = useState(null); // ✨ 책 상세 정보 상태
  const [reviews, setReviews] = useState([]); // ✨ 리뷰 상태
  const [averageRating, setAverageRating] = useState(0); // ✨ 평균 별점
  const [selectedItem, setSelectedItem] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Received book id:", book_id);
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/books/bookdetail/${book_id}/`
        );
        setBook(response.data);
        setReviews(response.data.reviews); // ✨ 리뷰 상태 설정
        calculateRatingStats(response.data.reviews); // ✨ 별점 통계 계산
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
    setAverageRating((totalRatings / reviews.length).toFixed(1)); // 평균 별점 계산
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSelection = (index) => {
    setSelectedItem(index);
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
                    <StarRatings rating={averageRating} />{" "}
                    {/* 평균 별점 표시 */}
                    {/* <p>평균 별점: {averageRating} / 5</p> */}
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

            <div className="content">
              {selectedItem === 0 && (
                <div>
                  <div className="overay">
                    <input
                      className="review"
                      placeholder="당신의 한 줄 리뷰를 남겨주세요!"
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
                <div className="introduction-overay">
                  <p className="introduction">{book.description}</p>
                </div>
              )}

              {selectedItem === 2 && <Question />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetail;
