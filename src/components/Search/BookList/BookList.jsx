import { useEffect, useState } from "react";
import "./Booklist.scss";
import { useNavigate } from "react-router-dom";
// import UpBar from "../../UpBar/UpBar";

const BookList = ({ category }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  // 목업 데이터
  const mockBooks = [
    {
      book_id: 1,
      bookcover: "https://via.placeholder.com/100",
      title: "Mock Book 1",
      introduction: "This is a mock introduction for book 1.",
    },
    {
      book_id: 2,
      bookcover: "https://via.placeholder.com/100",
      title: "Mock Book 2",
      introduction: "This is a mock introduction for book 2.",
    },
    {
      book_id: 3,
      bookcover: "https://via.placeholder.com/100",
      title: "Mock Book 3",
      introduction: "This is a mock introduction for book 3.",
    },
    {
      book_id: 4,
      bookcover: "https://via.placeholder.com/100",
      title: "Mock Book 3",
      introduction: "This is a mock introduction for book 3.",
    },
    {
      book_id: 5,
      bookcover: "https://via.placeholder.com/100",
      title: "Mock Book 3",
      introduction: "This is a mock introduction for book 3.",
    },
  ];

  useEffect(() => {
    // API 대신 목업 데이터를 사용
    setBooks(mockBooks);
  }, [category]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };
  return (
    <div>
      {/* <UpBar /> */}
      <div className="booklist-container">
        {books.length > 0 ? (
          books.map((book) => (
            <div className="book-item" key={book.book_id}>
              <img
                src={book.bookcover}
                alt={book.title}
                onClick={() => handleBookClick(book.book_id)}
              />
              <div className="mark">
                <p>{book.introduction}</p>
              </div>
            </div>
          ))
        ) : (
          <p>책 목록이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
