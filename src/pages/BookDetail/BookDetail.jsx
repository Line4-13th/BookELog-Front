import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BookDetail.scss";
import BackButton from "../../assets/BackButton.svg";
import magnifyingglass from "../../assets/Search/magnifyingglass.svg";
import OneSentence from "../../components/ReviewPage/OneSentence";

const BookDetail = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(0);
  const [reviews, setReviews] = useState([
    { id: 1, userName: "유저1", reviewText: "정말 좋은 책이에요!" },
    {
      id: 2,
      userName: "유저2",
      reviewText: "생각할 거리를 많이 주는 책입니다.",
    },
    { id: 3, userName: "유저3", reviewText: "추천합니다!" },
  ]);

  const book = {
    title: "나는 소망한다 내게 금지된 것을",
    author: "양귀자",
    publisher: "쓰다",
    publicationDate: "2019년 4월",
    cover: "https://via.placeholder.com/100",
    rating: 4,
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSelection = (index) => {
    setSelectedItem(index);
  };

  return (
    <div>
      <button className="back-button" onClick={goBack}>
        <img src={BackButton} alt="뒤로가기" />
      </button>

      <div className="whole-container">
        <div className="bookdetail-container">
          <div className="left">
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
            </div>
          </div>

          <div className="whole-right">
            <div className="right">
              <div className="book-details">
                <h2>{`《${book.title}》`}</h2>
                <p className="author-info">{`${book.author} 저`}</p>
                <p className="publication-info">{`${book.publisher} | ${book.publicationDate}`}</p>
                <button className="purchase-button">구매하기</button>
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
                <p className="review">당신의 한 줄 리뷰를 남겨주세요!</p>
              </div>
              <div className="onesentence-list">
                {reviews.map((review) => (
                  <OneSentence
                    className="onesentence"
                    key={review.id}
                    userName={review.userName}
                    reviewText={review.reviewText}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedItem === 1 && (
            <div className="introduction-overay">
              <p className="introduction">책 소개 내용</p>
            </div>
          )}

          {selectedItem === 2 && (
            <div className="overay">
              <div className="second-overay">
                <img src={magnifyingglass} />
                <p className="question">
                  책 내용에 대한 궁금증을 작성해보세요!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
