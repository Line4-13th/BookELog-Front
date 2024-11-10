// src/pages/Home/QnARecordPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QnAPage.scss';

const QnAPage = () => {
  const navigate = useNavigate();

  const qaRecords = [
    {
      book: '《영화 속 샌드위치 도감》',
      questioner: '주혜린',
      question: '다른 독자분들 중에 책따라 영화따라 샌드위치 만들어 드셔보신 분 계신가요?',
      responder: '초코캣님',
      answer: '아메리칸 셰프 쿠바 샌드위치 부분 보고 영화 따라 보다가 쿠바 샌드위치 만들어 먹어봤어요.',
    },
    {
      book: '《나는 소망한다 내게 금지된 것을》',
      questioner: '양귀자',
      question: '만약 민주가 살아서 경찰에 잡혔다면 민주는 법적 처벌을 받았을까요? 다들 어떻게 생각하시는지...',
      responder: '금붕어님',
      answer: '처벌은 받겠지만 피해자인 백승하가 남치의 의미에 대해 피해하며 형량을 줄일 수 있도록 도와주지 않았을까요?',
    },
    {
      book: '《칼테일, 러브, 좀비》',
      questioner: '조예은',
      question: '칼테일 러브 좀비의 오랜밤 나이프, 나이프 파트가 너무 좋네요. 혹시 이런 비슷한 책 아시는 분?',
      responder: '거위님',
      answer: '타임리프 소설 공모전에 나온 책들 찾아서 읽어보세요! 저도 이 오랜밤 나이프, 나이트 보고 타임리프 소설에 빠졌습니다..',
    },
  ];

  return (
    <div className="qna-container">
      <header className="qna-header">
        <button onClick={() => navigate(-1)}>&larr;</button>
        <h2>Q&A 기록</h2>
      </header>
      <div className="qa-list">
        {qaRecords.map((qa, index) => (
          <div key={index} className="qa-card">
            <p className="qa-book">{qa.book} <span className="questioner">{qa.questioner}</span> <span className="view-more">더 보기 &gt;</span></p>
            <div className="question">
              <p>Q {qa.question}</p>
              <span>{qa.questioner}</span>
            </div>
            <div className="answer">
              <p>A {qa.answer}</p>
              <span>{qa.responder}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnAPage;
