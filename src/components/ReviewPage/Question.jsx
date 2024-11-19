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
  const [newQuestion, setNewQuestion] = useState(""); // 새로운 질문 상태
  const [newAnswer, setNewAnswer] = useState(""); // 새로운 답변 상태
  const [user, setUser] = useState(null); // 로그인된 사용자 정보

  // 로컬 스토리지에서 사용자 데이터 불러오기
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    console.log("localStorage에서 가져온 userData:", storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("파싱된 사용자 정보:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("userData 파싱 중 오류 발생:", error);
        setUser(null); // 파싱 오류 시 null로 설정
      }
    } else {
      console.warn("localStorage에 userData가 없습니다.");
      setUser(null); // userData가 없을 때 null로 설정
    }
    setLoading(false);
  }, []);

  // 질문 목록 불러오기
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

  // 질문 POST 요청
  const postQuestion = async () => {
    if (!newQuestion.trim()) {
      alert("질문을 입력해주세요.");
      return;
    }

    console.log("POST 요청 payload:", {
      username: user?.userId || "Unknown User",
      content: newQuestion,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/books/bookdetail/${book_id}/question/`,
        {
          username: user?.userId || "Unknown User", // 로컬 스토리지에서 userId 사용
          content: newQuestion,
        }
      );
      console.log("New question submitted:", response.data);
      setNewQuestion(""); // 질문 입력 초기화
      setQuestions((prev) => [...prev, response.data]); // 새로운 질문 추가
    } catch (error) {
      console.error("질문 저장 중 오류 발생:", error);
      alert("질문을 저장하는 데 실패했습니다.");
    }
  };

  // 모달 열기
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

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectedQuestion(null);
    setNewAnswer(""); // 모달 닫을 때 입력 필드 초기화
  };

  // 답변 POST 요청
  const handleAnswerSubmit = async (questionId) => {
    if (!newAnswer.trim()) {
      alert("답변을 입력해주세요.");
      return;
    }

    console.log("POST 요청 payload:", {
      username: user?.userId || "Unknown User",
      content: newAnswer,
    });

    try {
      const response = await axios.post(
        `${BASE_URL}/api/books/bookdetail/${book_id}/${questionId}/answer/`,
        {
          username: user?.userId || "Unknown User", // 로컬 스토리지에서 userId 사용
          content: newAnswer,
        }
      );
      console.log("Answer submitted:", response.data);

      // 선택된 질문 데이터 갱신
      handleOpenModal(questionId);
      setNewAnswer(""); // 답변 입력 초기화
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
        <div className="user-info">
          {/* <p>
            로그인된 사용자: <strong>{user?.userId || "게스트"}</strong>
          </p> */}
        </div>
        <div className="question-back">
          <img src={magnifying} alt="magnifying" />
          <input
            className="question-input"
            placeholder="책 내용에 대한 궁금증을 작성해보세요!"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                postQuestion(); // 엔터 키 입력 시 질문 저장
                alert("리뷰와 별점이 저장되었습니다!");
              }
            }}
          />
        </div>
      </div>

      {/* 질문 목록 */}
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
                onClick={() => handleAnswerSubmit(selectedQuestion.id)}
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
