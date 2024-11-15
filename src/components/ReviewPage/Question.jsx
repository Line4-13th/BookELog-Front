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
  const [newAnswer, setNewAnswer] = useState(""); // 새로운 답변 상태
  const [user, setUser] = useState(null); // 로그인된 사용자 정보

  useEffect(() => {
    // 로그인 상태 확인 및 사용자 정보 가져오기
    const storedUser = JSON.parse(localStorage.getItem("userData")); // 로컬 스토리지에서 사용자 정보 가져오기

    if (storedUser) {
      console.log("로그인된 사용자 정보:", storedUser);
      setUser(storedUser); // 상태에 사용자 정보 설정
    } else {
      console.warn("사용자가 로그인되어 있지 않습니다.");
    }

    // 질문 데이터 가져오기
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
    setNewAnswer(""); // 모달 닫을 때 입력 필드 초기화
  };

  const handleAnswerSubmit = async (questionId) => {
    if (!newAnswer.trim()) {
      alert("답변을 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/books/bookdetail/${book_id}/${questionId}/answer/`,
        {
          username: user?.username || "Unknown User", // 로그인된 사용자 이름 사용
          content: newAnswer,
        }
      );
      console.log("Answer submitted:", response.data);
      console.log("현재 사용자 이름:", user?.username); // username 값 확인용 로그

      // 모달 닫기 후 질문 갱신
      handleOpenModal(selectedQuestion.id);
      setNewAnswer("");
    } catch (error) {
      console.error("답변 저장 중 오류 발생:", error);
      alert("답변을 저장하는 데 실패했습니다.");
    }
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
            <h2 className="modal-question">Q. {selectedQuestion.content}</h2>
            {selectedQuestion.answers.map((answer) => (
              <div key={answer.id} className="answer-item">
                <div className="userandid">
                  <h2>A.</h2>
                  <h2>{answer.user}</h2>
                </div>
                <p>{answer.content}</p>
              </div>
            ))}

            {/* 답변 작성 영역 */}
            <div className="new-answer">
              <input
                type="text"
                placeholder="답변을 작성해주세요."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                onClick={() => handleAnswerSubmit(selectedQuestion)}
                className="submit-answer"
              >
                답변 등록
              </button>
            </div>

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
