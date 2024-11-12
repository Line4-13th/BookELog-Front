import magnifying from "../../assets/Search/magnifyingglass.svg";
import "./OneSentenceItem.scss";

const QuestionItem = ({ userName, questionText, answers }) => {
  return (
    <div className="question-ccontainer">
      <div className="question">
        <div className="up-container">
          <img src={magnifying} alt="magnifying" />
          <p className="name">{userName}</p>
        </div>
        <p className="question-text">{questionText}</p>
      </div>

      <div className="white-container">
        <p className="answer-text"></p>
      </div>
    </div>
  );
};

export default QuestionItem;
