// import React from 'react';
import glass from '../../assets/magnifyingglass_brown.svg'
import './booksearch.scss';

function BookSearch() {

  return (
    <div className="book-search-container">
      <header className="book-search-header">
        <button className="back-button" />
        <p className="book-search-title">책 검색</p>
      </header>
      <div className="book-search-main">
        <form className="book-search">
          <img
            src={glass}
            alt="Magnifying Glass Icon"
          />
          <input 
            type="text"
            onChange={(e) => e.target.value}
          />
        </form>
        <div className="book-search-result">
          
        </div>
      </div>
    </div>
  )
}

export default BookSearch;

