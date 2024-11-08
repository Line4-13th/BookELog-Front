// import React from "react";
import "./Question.scss";
import magnifying from "../../assets/Search/magnifyingglass.svg";

const mockData = [
  {
    id: 1,
    userName: "김연진",
    questionText:
      "만약 민주가 살아서 경찰에 잡혔다면 민주는 법적 처벌을 받았을까요? 다들 어떻게 생각하시나요?",
    answerText:
      "처벌은 받겠지만 피해자인 백송하가 납치의 의미에 대해 피해하며 형량을 줄일 수 있도록 도와주지 않았을까요?",
  },
  {
    id: 2,
    userName: "단추님",
    questionText:
      "세상 사람들은 백송하가 그녀에게 죄가 없다고 말하면서도 무조건적으로 별을 주려 하지 않을까요?",
    answerText: "세상은 생각보다 더 악하고 망청하며 본질을 잘 잊으니까요.",
  },
  {
    id: 3,
    userName: "해피님",
    questionText: "형사사건으로 그녀가 더 이상 나아가지 않길 바랐어요.",
    answerText:
      "역사 속에서 악한 이들도 무죄라던 판결에 별이 있다면 그게 전부일까요?",
  },
];

const Question = () => {
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
          <div key={item.id} className="question-container">
            {/* 질문 영역 */}
            <div className="question">
              <div className="up-container">
                <img src={magnifying} alt="magnifying" />
                <p className="name">{item.userName}</p>
              </div>
              <p className="question-text">{item.questionText}</p>
            </div>

            {/* 답변 영역 */}
            <div className="white-container">
              <div className="white-up-container">
                <h1>A</h1>
                <p className="answer-name">{item.userName}</p>
              </div>
              <p className="answer-text">{item.answerText}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
