// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecordCheck.scss";

function RecordCheck() {
  const location = useLocation(); // 전달된 state 가져오기
  const { bookTitle, recordContent } = location.state || {}; // BookDetailPage에서 전달한 bookTitle과 recordContent 받기
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleImageClick = (imageUrl) => {
    navigate("/fullcontent", { state: { bookTitle, recordContent, imageUrl } });
  };

  // recordContent에서 이미지 URL 추출하기 (정규식을 사용)
  const extractImageUrl = (htmlContent) => {
    const regex = /<img src="(.*?)"[^>]*>/g; // <img> 태그에서 src 속성의 값을 추출
    const matches = [];
    let match;
    while ((match = regex.exec(htmlContent))) {
      matches.push(match[1]); // 이미지 URL 저장
    }
    return matches; // 추출된 모든 이미지 URL을 배열로 반환
  };

  const imageUrls = extractImageUrl(recordContent);
  const defaultImage = "path/to/your/default-image.png"; // 대체 이미지 경로

  // 이미지가 없을 경우에도 클릭 시 이동할 수 있게 하도록 처리
  const handleNoImageClick = () => {
    // 이미지가 없더라도 이동하도록 처리
    navigate("/fullcontent", {
      state: { bookTitle, recordContent, imageUrl: defaultImage },
    });
  };

  return (
    <div className="rrecord-container">
      <header className="book-detail-header">
        <button className="back-button" onClick={handleBack}>
          ←
        </button>
        <div className="folder-dropdown">
          <p>{bookTitle}</p> {/* 전달된 제목 표시 */}
        </div>
      </header>

      <div className="record-check-content">
        <div className="content-row">
          {imageUrls.length > 0 ? (
            imageUrls.map((url, index) => (
              <div className="content-item" key={index}>
                <img
                  src={url || defaultImage} // 이미지가 없으면 기본 대체 이미지 사용
                  alt={`Content ${index}`}
                  onClick={() => handleImageClick(url)} // 클릭 시 해당 이미지의 URL 전달
                />
              </div>
            ))
          ) : (
            <div className="content-item" onClick={handleNoImageClick}>
              <p>이미지가 없습니다</p>{" "}
              {/* 이미지가 없으면 텍스트로 대체, 클릭 시 이동 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecordCheck;
