import { useEffect, useState } from "react";
import "./Booklist.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../../API_URL";

const BookList = ({ category }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedText, setSelectedText] = useState(""); // ✨ 선택된 텍스트 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // ✨ 모달 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/books/?category=${category}`
        );

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setBooks([]);
        }

        setError(null);
      } catch (err) {
        console.error("책 데이터를 불러오는 중 오류 발생:", err);
        setError("서버와의 연결에 문제가 발생했습니다.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleTextClick = (fullText) => {
    setSelectedText(fullText);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="booklist-container">
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : Array.isArray(books) && books.length > 0 ? (
          books.map((book) => (
            <div className="book-item" key={book.id}>
              <img
                src={book.cover_image}
                alt={book.title}
                onClick={() => handleBookClick(book.id)}
              />
              <div className="introductionmark">
                <p onClick={() => handleTextClick(book.introduction)}>
                  {book.introduction.length > 50
                    ? `${book.introduction.slice(0, 50)}...`
                    : book.introduction}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-book-message">
            선택한 카테고리에 해당하는 책이 없습니다.
          </p>
        )}
      </div>

      {/* ✨ 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <p>{selectedText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
