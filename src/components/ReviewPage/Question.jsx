import { useState, useEffect } from "react";
import "./Question.scss";
import magnifying from "../../assets/Search/magnifyingglass.svg";
import QuestionItem from "./QuestionItem";

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
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleOpenModal = (question) => {
    setSelectedQuestion(question);
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
  };

  useEffect(() => {
    if (selectedQuestion) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [selectedQuestion]);

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
            <QuestionItem
              userName={item.userName}
              questionText={item.questionText}
              answers={item.answers}
              showAllAnswers={false} // 첫 번째 답변만 표시
            />
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedQuestion && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <QuestionItem
              userName={selectedQuestion.userName}
              questionText={selectedQuestion.questionText}
              answers={selectedQuestion.answers}
              showAllAnswers={true} // 모든 답변 표시
            />
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
