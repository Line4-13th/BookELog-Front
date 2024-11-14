import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Question.scss";
import magnifying from "../../assets/Search/magnifyingglass.svg";
import QuestionItem from "./QuestionItem"; // 분리한 컴포넌트 임포트
import axios from "axios";
import BASE_URL from "../../../API_URL"; // API URL

const Question = () => {
  const { book_id } = useParams(); // URL에서 book_id 가져오기
  const [questions, setQuestions] = useState([]); // 질문 목록 상태
  const [selectedQuestion, setSelectedQuestion] = useState(null); // 선택된 질문
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/books/bookdetail/${book_id}/qna_list/`
        );
        console.log("Questions data:", response.data);
        setQuestions(response.data); // 질문 목록 설정
        setError(null);
      } catch (err) {
        console.error("질문 데이터를 불러오는 중 오류 발생:", err);
        setError("질문 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [book_id]);

  const handleOpenModal = async (questionId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/books/bookdetail/${book_id}/${questionId}/answers/`
      );
      console.log("Selected question data:", response.data);
      setSelectedQuestion(response.data.question); // 선택된 질문 데이터 설정
    } catch (err) {
      console.error("선택된 질문 데이터를 불러오는 중 오류 발생:", err);
      alert("질문 데이터를 가져오는 데 실패했습니다.");
    }
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

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
        {questions.map((item) => (
          <div key={item.id} className="question-ccontainer">
            <button onClick={() => handleOpenModal(item.id)} className="more">
              더보기
            </button>
            <QuestionItem
              userName={item.user}
              questionText={item.content}
              answer={item.answers[0]} // 첫 번째 답변만 전달
            />
          </div>
        ))}
      </div>

      {/* 모달 */}
      {selectedQuestion && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>질문: {selectedQuestion.content}</h2>
            {selectedQuestion.answers.map((answer) => (
              <div key={answer.id} className="answer-item">
                <h3>답변 {answer.id}</h3>
                <p>{answer.content}</p>
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
