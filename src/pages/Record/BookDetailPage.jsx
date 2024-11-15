import React, { useState, useEffect } from "react";
import bookCover from "../../assets/sample-book-cover.svg";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./bookdetailpage.scss";
import RecordInput from "../../components/RecordInput/RecordInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../API_URL";

function BookDetailPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(""); // 선택된 폴더 이름
  const [folders, setFolders] = useState([]); // 폴더 목록
  const [selectedFolderId, setSelectedFolderId] = useState(null); // 선택된 폴더 ID
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(4);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("2024-10-26");
  const [endDate, setEndDate] = useState("2024-10-28");
  const [dateType, setDateType] = useState("start");

  const [recordContent, setRecordContent] = useState(""); // RecordInput 내용 상태 관리
  const [uploadedImage, setUploadedImage] = useState(null); // 업로드된 이미지 상태
  const navigate = useNavigate(); // 네비게이션 훅 사용

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/reading_log/folders/`
        );
        setFolders(response.data);
        if (response.data.length > 0) {
          setSelectedFolder(response.data[0].name);
          setSelectedFolderId(response.data[0].id); // 첫 번째 폴더 ID 설정
        }
      } catch (error) {
        console.error("폴더 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchFolders();
  }, []);

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder.name);
    setSelectedFolderId(folder.id); // 폴더 ID 업데이트
    setShowDropdown(false);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setShowRatingModal(false);
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    if (dateType === "start") {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }
    setShowDatePicker(false);
  };

  const openDatePicker = (type) => {
    setDateType(type);
    setShowDatePicker(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("book", 1); // 책 ID (하드코딩 예시)
    formData.append("folder", selectedFolderId); // 선택된 폴더 ID
    formData.append("rating", rating);
    formData.append("start_date", startDate);
    formData.append("completion_date", endDate);
    formData.append("notes", recordContent); // Quill 입력된 내용

    if (uploadedImage) {
      formData.append("image", uploadedImage); // 이미지 파일 추가
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/reading_log/user_reading_logs/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("기록 저장 성공:", response.data);
      alert("기록이 성공적으로 저장되었습니다!");
      navigate("/recordcheck", { state: { recordContent } });
    } catch (error) {
      console.error("기록 저장 실패:", error);
      alert("기록 저장에 실패했습니다.");
    }
  };

  return (
    <div className="book-detail-container">
      <header className="book-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="folder-dropdown">
          <p onClick={() => setShowDropdown(!showDropdown)}>
            {selectedFolder} ⬇
          </p>
          {showDropdown && (
            <div className="dropdown-menu">
              {folders.map((folder) => (
                <p key={folder.id} onClick={() => handleFolderSelect(folder)}>
                  {folder.name}
                </p>
              ))}
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
        <RecordInput
          onContentChange={(content) => setRecordContent(content)}
          onImageUpload={(file) => setUploadedImage(file)}
        />
      </div>
    </div>
  );
}

export default BookDetailPage;
