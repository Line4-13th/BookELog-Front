import React, { useState } from "react";
import bookCover from "../../assets/sample-book-cover.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./bookdetailpage.scss";
import RecordInput from "../../components/RecordInput/RecordInput";
import { useNavigate } from "react-router-dom";

function BookDetailPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("2024 가을");
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(4);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("October 26, 2024");
  const [endDate, setEndDate] = useState("October 28, 2024");
  const [dateType, setDateType] = useState("start");

  const [recordContent, setRecordContent] = useState(""); // RecordInput 내용 상태 관리
  const navigate = useNavigate(); // 네비게이션 훅 사용

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
    setShowDropdown(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setShowRatingModal(false);
  };

  const handleDateChange = (date) => {
    if (dateType === "start") {
      setStartDate(date.toDateString());
    } else {
      setEndDate(date.toDateString());
    }
    setShowDatePicker(false);
  };

  const openDatePicker = (type) => {
    setDateType(type);
    setShowDatePicker(true);
  };

  const handleSave = () => {
    console.log("저장된 내용:", recordContent); // 제출 데이터 확인
    // API 요청 또는 저장 로직을 추가할 수 있습니다.
    alert("저장되었습니다!");

    // 저장 후 RecordCheck 페이지로 네비게이트
    navigate("/recordcheck", { state: { recordContent } });
  };

  return (
    <div className="book-detail-container">
      <header className="book-detail-header">
        <button className="back-button">←</button>
        <div className="folder-dropdown">
          <p onClick={() => setShowDropdown(!showDropdown)}>
            {selectedFolder} ⬇
          </p>
          {showDropdown && (
            <div className="dropdown-menu">
              <p onClick={() => handleFolderSelect("2024 가을")}>2024 가을</p>
              <p onClick={() => handleFolderSelect("인생 책 모음")}>
                인생 책 모음
              </p>
              <p onClick={() => handleFolderSelect("2024 여름")}>2024 여름</p>
            </div>
          )}
        </div>
        <button className="save-button" onClick={handleSave}>
          저장
        </button>
      </header>

      <div className="title-container">Title</div>

      <section className="book-detail-content">
        <div className="book-info">
          <img src={bookCover} alt="Book Cover" className="book-cover" />
          <div className="book-details">
            <p className="book-name">《나는 소망한다 내게 금지된 것을》</p>
            <p className="author">양귀자</p>
            <p className="rating" onClick={() => setShowRatingModal(true)}>
              나의 평점 ⭐{rating}
            </p>
            <p className="date" onClick={() => openDatePicker("start")}>
              읽기 시작한 날: <span>{startDate}</span>
            </p>
            <p className="date" onClick={() => openDatePicker("end")}>
              완독한 날: <span>{endDate}</span>
            </p>
          </div>
        </div>
      </section>

      {showRatingModal && (
        <div className="rating-modal">
          <p>평점 주기</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => handleRatingChange(star)}>
              {star <= rating ? "⭐" : "☆"}
            </span>
          ))}
          <div>
            <button onClick={() => setShowRatingModal(false)}>취소</button>
            <button onClick={() => handleRatingChange(rating)}>확인</button>
          </div>
        </div>
      )}

      {showDatePicker && (
        <div className="date-picker-modal">
          <Calendar onChange={handleDateChange} />
          <button onClick={() => setShowDatePicker(false)}>닫기</button>
        </div>
      )}

      <div className="recordinputcomponent">
        <RecordInput onContentChange={(content) => setRecordContent(content)} />{" "}
        {/* 내용 전달 */}
      </div>
    </div>
  );
}

export default BookDetailPage;
