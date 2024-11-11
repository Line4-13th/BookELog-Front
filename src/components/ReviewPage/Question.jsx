import { useState } from "react";
import "./Question.scss";
import magnifying from "../../assets/Search/magnifyingglass.svg";

const mockData = [
  {
    id: 1,
    userName: "김연진",
    questionText:
      "만약 민주가 살아서 경찰에 잡혔다면 민주는 법적 처벌을 받았을까요? 다들 어떻게 생각하시나요?",
    answers: [
      { id: 1, answerText: "첫 번째 답변입니다." },
      { id: 2, answerText: "두 번째 답변입니다." },
      { id: 3, answerText: "세 번째 답변입니다." },
    ],
  },
  {
    id: 2,
    userName: "단추님",
    questionText:
      "세상 사람들은 백송하가 그녀에게 죄가 없다고 말하면서도 무조건적으로 별을 주려 하지 않을까요?",
    answers: [
      { id: 1, answerText: "첫 번째 답변입니다." },
      { id: 2, answerText: "두 번째 답변입니다." },
    ],
  },
  {
    id: 3,
    userName: "해피님",
    questionText: "형사사건으로 그녀가 더 이상 나아가지 않길 바랐어요.",
    answers: [
      { id: 1, answerText: "첫 번째 답변입니다." },
      { id: 2, answerText: "두 번째 답변입니다." },
    ],
  },
];

const Question = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null); // 선택된 질문 상태

  const handleOpenModal = (question) => {
    setSelectedQuestion(question);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
  };

  return (
    <div>
      {/* 질문 입력 영역 */}
      <div className="question-container">
        <div className="question-back">
          <img src={magnifying} alt="magnifying" />
          <input
            className="question-input"
            placeholder="책 내용에 대한 궁금증을 작성해보세요!"
          />
        </div>
      </div>

      {/* 답변 모음 */}
      <div className="back-container">
        {mockData.map((item) => (
          <div key={item.id} className="question-ccontainer">
            <button onClick={() => handleOpenModal(item)} className="more">
              더보기
            </button>
            {/* 질문 영역 */}
            <div className="question">
              <div className="up-container">
                <img src={magnifying} alt="magnifying" />
                <p className="name">{item.userName}</p>
              </div>
              <p className="question-text">{item.questionText}</p>
            </div>

            {/* 답변 영역 - 첫 번째 답변만 표시 */}
            <div className="white-container">
              <div className="white-up-container">
                <h1>A</h1>
                <p className="answer-name">{item.userName}</p>
              </div>
              <p className="answer-text">{item.answers[0].answerText}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedQuestion && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>질문: {selectedQuestion.questionText}</h2>
            {selectedQuestion.answers.map((answer) => (
              <div key={answer.id} className="answer-item">
                <h3>답변 {answer.id}</h3>
                <p>{answer.answerText}</p>
              </div>
            ))}
            <button onClick={handleCloseModal} className="close-modal">
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Question;
