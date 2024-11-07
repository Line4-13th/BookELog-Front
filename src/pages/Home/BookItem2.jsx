// import React from 'react';
import './bookitem2.scss';
import PropTypes from 'prop-types';

function BookItem2({ imageUrl, title, author, description }) {

  return (
    <div className="book-item2-container">
      <div className="book-item2-box">
        <p className="book-item2-title">《{title}》 {author}</p>
        <p className="book-item2-desc">{description}</p>
      </div>
      <div className="book-item2-book">
        <img src={imageUrl} alt={title} className="book-item2-image"/>
      </div>
    </div>
  )
}

BookItem2.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
};

export default BookItem2;