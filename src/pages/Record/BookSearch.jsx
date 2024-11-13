import { useState } from 'react';
import axios from 'axios';
import glass from '../../assets/magnifyingglass_brown.svg';
import './booksearch.scss';
import API_URL from '../../../API_URL';

function BookSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await axios.get(`${API_URL}/reading_log/books/search/`, {
        params: { title: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('검색결과 fetch 오류: ', error);
    }
  };

  return (
    <div className="book-search-container">
      <header className="book-search-header">
        <button className="back-button" />
        <p className="book-search-title">책 검색</p>
      </header>
      <div className="book-search-main">
        <form className="book-search" onSubmit={handleSearchSubmit}>
          <img src={glass} alt="Magnifying Glass Icon" />
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="책 제목을 입력하세요"
          />
        </form>
        <div className="record-book-search-result">
          {searchResults.map((book, index) => (
            <div key={index} className="record-book-item">
              <img src={book.cover_image} alt={`${book.title} cover`} className="record-book-cover" />
              <div className="record-book-info">
                <p className="record-book-title">{book.title}</p>
                <p className="record-book-author">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
