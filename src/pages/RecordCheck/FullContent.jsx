import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FullContent.scss";

function FullContent() {
  const location = useLocation(); // 전달된 state 가져오기
  const { bookTitle, recordContent, imageUrl } = location.state || {}; // 전달된 bookTitle, recordContent, imageUrl 받기
  const navigate = useNavigate();

  useEffect(() => {
    console.log("FullContent received data:", {
      bookTitle,
      recordContent,
      imageUrl,
    });
  }, [bookTitle, recordContent, imageUrl]);

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  return (
    <div className="full-content-container">
      <header className="book-detail-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <div className="folder-dropdown">
          <p>{bookTitle}</p> {/* 전달된 제목 표시 */}
        </div>
      </header>

      <div className="full-content">
        {/* 전달된 imageUrl이 있으면 표시 */}
        {/* {imageUrl ? (
          <img src={imageUrl} alt="Full Content" style={{ maxWidth: "100%" }} />
        ) : (
          <p>No image available</p>
        )} */}

        {/* Quill에서 작성한 전체 내용 표시 */}
        <div dangerouslySetInnerHTML={{ __html: recordContent }} />
      </div>
    </div>
  );
}

export default FullContent;
