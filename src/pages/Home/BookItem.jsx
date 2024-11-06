// import React from 'react';
import './bookitem.scss';
import PropTypes from 'prop-types';

function BookItem({ imageUrl, title, author, description }) {

  return (
    <div className="book-item-container">
      <div className="book-item-box">
        <p className="book-item-title">《{title}》 {author}</p>
        <p className="book-item-desc">{description}</p>
      </div>
      <div className="book-item-book">
        <img src={imageUrl} alt={title} className="book-item-image"/>
      </div>
    </div>
  )
}

BookItem.propTypes = {
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
};

export default BookItem;


// import React from 'react';
// import './BookItem.scss';

// const BookItem = ({ imageUrl, title, author, description }) => {
//   return (
//     <article className="book-item">
//       <img src={imageUrl} alt={title} className="book-image" />
//       <div className="book-content">
//         <h2 className="book-title">{title}</h2>
//         <p className="book-author">{author}</p>
//         <p className="book-description">{description}</p>
//       </div>
//     </article>
//   );
// };

// export default BookItem;
