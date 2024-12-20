import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/Search/magnifyingglass.svg";
import "./Search.scss";
import axios from "axios";
import BASE_URL from "../../../API_URL";

const Search = ({ setIsSearching }) => {
  const [query, setQuery] = useState(""); // 검색어 상태 관리
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const [selectedText, setSelectedText] = useState(""); // ✨ 선택된 텍스트 상태
  const [isModalOpen, setIsModalOpen] = useState(false); // ✨ 모달 상태
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false); // ✨ 검색 상태 업데이트
      return;
    }

    setIsSearching(true); // ✨ 검색 상태 true로 설정

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
  }, [query, setIsSearching]);

  const handleBookClick = (bookId) => {
    console.log(`Navigating to book detail page with ID: ${bookId}`);
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
              <li key={book.id} className="resultItem">
                <img
                  src={book.cover_image}
                  alt={book.introduction}
                  onClick={() => handleBookClick(book.id)}
                />
                <div className="introductionmark">
                  <p onClick={() => handleTextClick(book.introduction)}>
                    {book.introduction.length > 50
                      ? `${book.introduction.slice(0, 50)}...`
                      : book.introduction}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {!loading && searchResults.length === 0 && query && (
          <p className="errormessage">검색 결과가 없습니다.</p>
        )}
      </div>

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

export default Search;
