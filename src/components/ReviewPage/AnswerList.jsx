import { useParams, useNavigate } from "react-router-dom";
import "./AnswerList.scss";
import BackButton from "../../assets/backbutton.svg";

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
];

const AnswerList = () => {
  const { id } = useParams(); // URL에서 질문 ID 가져오기
  const navigate = useNavigate();

  const question = mockData.find((q) => q.id === parseInt(id));

  if (!question) {
    return <p>첫 번째 질문을 달아주세요!</p>;
  }

  return (
    <div>
      <button>
        <img src={BackButton} onClick={() => navigate(-1)} />
      </button>
      <div className="answer-list">
        <h2 className="q">Q. {question.questionText}</h2>
        <div>
          {question.answers.map((answer) => (
            <div key={answer.id} className="answer-item">
              <h3>답변 {answer.id}</h3>
              <p>{answer.answerText}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnswerList;
