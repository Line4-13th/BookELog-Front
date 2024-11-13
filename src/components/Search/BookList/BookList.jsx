import { useEffect, useState } from "react";
import "./Booklist.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../../API_URL"; // ✨ BASE_URL import

const BookList = ({ category }) => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/books/?category=${category}`
        );

        console.log("API Response:", response.data); // ✨ 응답 데이터 확인

        // 응답이 배열인지 확인
        if (response.data && Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setBooks([]); // 예상치 못한 데이터일 경우 빈 배열로 설정
        }

        setError(null);
      } catch (err) {
        console.error("책 데이터를 불러오는 중 오류 발생:", err);
        setError("서버와의 연결에 문제가 발생했습니다.");
        setBooks([]); // 오류 발생 시 빈 배열로 설정
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div>
      <div className="booklist-container">
        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>{error}</p>
        ) : Array.isArray(books) && books.length > 0 ? ( // 배열 확인 추가
          books.map((book) => (
            <div className="book-item" key={book.id}>
              <img
                src={book.cover_image}
                alt={book.title}
                onClick={() => handleBookClick(book.id)}
              />
              <div className="introductionmark">
                <p>{book.introduction}</p>
              </div>
            </div>
          ))
        ) : (
          <p>선택한 카테고리에 해당하는 책이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default BookList;
