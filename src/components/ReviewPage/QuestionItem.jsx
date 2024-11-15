import "./QuestionItem.scss";
import magnifying from "../../assets/Search/magnifyingglass.svg";

const QuestionItem = ({
  userName,
  questionText,
  answer = {}, // 기본값 설정
}) => {
  return (
    <div>
      {/* 질문 영역 */}
      <div className="aligntext-container">
        <div className="question">
          <div className="up-container">
            <img src={magnifying} alt="magnifying" />
            <p className="name">{userName}</p>
          </div>
          <p className="question-text">{questionText}</p>
        </div>
      </div>

      {/* 답변 영역 */}
      {answer.content ? ( // 답변이 있는 경우에만 표시
        <div className="white-container">
          <div className="white-up-container">
            <h1>A</h1>
            <p className="answer-name">{answer.user || "익명"}</p>
          </div>
          <p className="answer-text">{answer.content}</p>
        </div>
      ) : (
        <p className="no-answer">아직 답변이 없습니다.</p>
      )}
    </div>
  );
};

export default QuestionItem;
