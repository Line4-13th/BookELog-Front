import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./BookDetail.scss";
import BackButton from "../../assets/BackButton.svg";

const BookDetail = () => {
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(0); // SwiftUI의 @State 변환

  const book = {
    title: "나는 소망한다 내게 금지된 것을",
    author: "양귀자",
    publisher: "쓰다",
    publicationDate: "2019년 4월",
    cover: "https://via.placeholder.com/100",
    rating: 4, // 별점은 5점 만점 중 4점으로 예시
  };

  const goBack = () => {
    navigate(-1);
  };

  // 세그먼티드 컨트롤 선택 핸들러
  const handleSelection = (index) => {
    setSelectedItem(index);
  };

  return (
    <div>
      <button className="back-button" onClick={goBack}>
        <img src={BackButton} alt="뒤로가기" />
      </button>

      <div className="whole-container">
        {/* 전체 컨테이너 */}
        <div className="bookdetail-container">
          {/* 왼쪽 책 커버 */}
          <div className="left">
            <div className="book-cover">
              <img src={book.cover} alt={book.title} />
            </div>
          </div>

          {/* 오른쪽 책 정보 */}
          <div className="right">
            <div className="book-details">
              <h2>{`《${book.title}》`}</h2>
              <p className="author-info">{`${book.author} 저`}</p>
              <p className="publication-info">{`${book.publisher} | ${book.publicationDate}`}</p>
              <button className="purchase-button">구매하기</button>
              {/* 세그먼티드 컨트롤 (한 줄 리뷰, 책 소개, Q&A) */}
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

              {/* 세그먼트에 따라 다르게 표시되는 내용 */}
              <div className="content">
                {selectedItem === 0 && <p>한 줄 리뷰 내용</p>}
                {selectedItem === 1 && <p>책 소개 내용</p>}
                {selectedItem === 2 && <p>Q&A 내용</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
