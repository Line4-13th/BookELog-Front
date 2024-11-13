// import React from 'react';
import './curationitem.scss';
import { useNavigate } from 'react-router-dom';
import BookItem from './BookItem';
import BookItem2 from './BookItem2';
import BookImage1 from '../../assets/curation_item_ex/Book1.svg';
import BookImage2 from '../../assets/curation_item_ex/Book2.svg';
import BookImage3 from '../../assets/curation_item_ex/Book3.svg';
import BookImage4 from '../../assets/curation_item_ex/Book4.svg';
import BookImage5 from '../../assets/curation_item_ex/Book5.svg';

function CurationItem() {
  const navigate = useNavigate();

  const articles = [
    { Component: BookItem, imageUrl: BookImage1, title: '와인이 있는 100가지 장면', author: '엄정선, 배두환', description: `와인을 좋아하시나요?\n이 책은 영화에 나오는 와인 그리고\n영화와 어울리는 와인을 추천합니다.\n이번 주말, 좋아하는 영화와 함께\n달콤씁쓸한 와인 한 모금 어떠신가요?` },
    { Component: BookItem2, imageUrl: BookImage2, title: '파란달의 시네마 레시피', author: '파란달', description: `영화 속 음식을 보며 군침을 흘리셨다면\n직접 만들어, 영화의 여운과 함께\n맛있는 음식을 좋아하는 사람들과\n공유해보세요!` },
    { Component: BookItem, imageUrl: BookImage3, title: '컬러의 세계', author: '찰스 브라메스코', description: `중경삼림이나 박하사탕과 같은 영화를\n보다보면 그 속 이야기만큼이나 색감이\n아름다워 영화를 더 사랑하게 됩니다.\n그 색감에 담긴 이야기를 알고 싶은 분들께\n추천드립니다. ` },
    { Component: BookItem2, imageUrl: BookImage4, title: '필름 속을 걷다', author: '이동진', description: `영화는 이상적인 현실을 담아내기 위해,\n혹은 이상적이 세상을 보여주기 위해 \n전 세계의 다양한 로케이션에서 찍습니다. \n당신도 그들을 따라 \n세상을 구경해보시길 바랍니다.`},
    { Component: BookItem, imageUrl: BookImage5, title: '좋은 영화 음악', author: '장서연', description: `영화 속에 다양한 장르의 음악이\n등장합니다. 그 음악을 문득 길가에서\n듣게되면 우린 마치 영화 속에\n들어온 것 같은 기분을 느끼기도 하죠.\n당신께 그런 노래를 선물할게요.`},
  ];

  return (
    <div className="curation-item-container">
      <header className="curation-item-header">
        <button className="back-button" onClick={() => navigate(-1)}/>
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

