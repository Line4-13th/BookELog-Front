import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✨ useNavigate 추가
import searchIcon from "../../assets/Search/magnifyingglass.svg";
import "./Search.scss";
import axios from "axios";
import BASE_URL from "../../../API_URL"; // API URL

const SearchList = () => {
  const [query, setQuery] = useState(""); // 검색어 상태 관리
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate(); // ✨ useNavigate 훅 사용

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]); // 검색어가 없으면 결과 초기화
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/books/?search=${query}`
        );
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setSearchResults(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setSearchResults([]);
        }
        setError(null);
      } catch (err) {
        console.error("검색 중 오류 발생:", err);
        setError("검색 결과를 가져오는 데 실패했습니다.");
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  // ✨ 특정 책의 상세 페이지로 이동
  const handleBookClick = (bookId) => {
    {
      console.log(`Navigating to book detail page with ID: ${bookId}`); // 클릭한 책의 ID 확인
      navigate(`/book/${bookId}`); // BookList와 동일한 URL로 이동
    }

    navigate(`/book/${bookId}`); // BookList와 동일한 URL로 이동
  };

  return (
    <div className="searchComponent">
      <div className="searchButton">
        <img src={searchIcon} alt="Search Icon" className="searchIcon" />
        <input
          type="text"
          placeholder="Search..."
          className="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="searchResults">
        {loading && <p>검색 중...</p>}
        {error && <p>{error}</p>}
        {!loading && searchResults.length > 0 && (
          <ul className="resultList">
            {searchResults.map((book) => (
              <li
                key={book.id}
                className="resultItem"
                onClick={() => handleBookClick(book.id)}
              >
                <img
                  src={book.cover_image}
                  alt={book.introduction}
                  // ✨ 이미지 클릭 시 상세 페이지로 이동
                />
                <p>{book.introduction}</p>
              </li>
            ))}
          </ul>
        )}
        {!loading && searchResults.length === 0 && query && (
          <p className="errormessage">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default SearchList;
