import "./QuestionItem.scss";
import magnifying from "../../assets/Search/magnifyingglass.svg";

const QuestionItem = ({
  userName,
  questionText,
  answers,
  showAllAnswers = false,
}) => {
  return (
    <div>
      {/* 질문 영역 */}
      <div className="question">
        <div className="up-container">
          <img src={magnifying} alt="magnifying" />
          <p className="name">{userName}</p>
        </div>
        <p className="question-text">{questionText}</p>
      </div>

      {/* 답변 영역 */}
      {showAllAnswers
        ? answers.map((answer) => (
            <div key={answer.id} className="white-container">
              <div className="white-up-container">
                <h1>A</h1>
                <p className="answer-name">{userName}</p>
              </div>
              <p className="answer-text">{answer.answerText}</p>
            </div>
          ))
        : answers.slice(0, 1).map((answer) => (
            <div key={answer.id} className="white-container">
              <div className="white-up-container">
                <h1>A</h1>
                <p className="answer-name">{userName}</p>
              </div>
              <p className="answer-text">{answer.answerText}</p>
            </div>
          ))}
    </div>
  );
};

export default QuestionItem;
