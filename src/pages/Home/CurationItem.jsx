// import React from 'react';
import './curationitem.scss';
import BookItem from './BookItem';
import BookItem2 from './BookItem2';
import BookImage1 from '../../assets/curation_item_ex/Book1.svg';
import BookImage2 from '../../assets/curation_item_ex/Book2.svg';

function CurationItem() {
  const articles = [
    { Component: BookItem, imageUrl: BookImage1, title: '와인이 있는 100가지 장면', author: '엄정선, 배두환', description: `와인을 좋아하시나요?\n이 책은 영화에 나오는 와인 그리고\n영화와 어울리는 와인을 추천합니다.\n이번 주말, 좋아하는 영화와 함께\n달콤씁쓸한 와인 한 모금 어떠신가요?` },
    { Component: BookItem2, imageUrl: BookImage2, title: '파란달의 시네마 레시피', author: '파란달', description: `영화 속 음식을 보며 군침을 흘리셨다면\n직접 만들어, 영화의 여운과 함께\n맛있는 음식을 좋아하는 사람들과\n공유해보세요!` },
    { Component: BookItem, imageUrl: BookImage1, title: '와인이 있는 100가지 장면', author: '엄정선, 배두환', description: `와인을 좋아하시나요?\n이 책은 영화에 나오는 와인 그리고\n영화와 어울리는 와인을 추천합니다.\n이번 주말, 좋아하는 영화와 함께\n달콤씁쓸한 와인 한 모금 어떠신가요?` },
    { Component: BookItem2, imageUrl: BookImage2, title: '파란달의 시네마 레시피', author: '파란달', description: `영화 속 음식을 보며 군침을 흘리셨다면\n직접 만들어, 영화의 여운과 함께\n맛있는 음식을 좋아하는 사람들과\n공유해보세요!` }
  ];

  return (
    <div className="curation-item-container">
      <header className="curation-item-header">
        <button className="back-button" />
        <div className="curation-item-picture"></div>
        <h1 className="curation-item-title">영화따라<br />낭만적인 하루 보내기</h1>
      </header>
      <article className="curation-item-articles">
        {articles.map((article, index) => {
          const { Component, ...props } = article;

          return (
            <Component
              key={index}
              {...props}
            />
          );
        })}
      </article>
    </div>
  );
}

export default CurationItem;

