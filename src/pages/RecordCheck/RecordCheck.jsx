import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./RecordCheck.scss";
import BackButton from "../../assets/backbutton_brown.svg";

function RecordCheck() {
  const location = useLocation();
  const { bookTitle, recordContent } = location.state || {};
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("2024 가을"); // 기본 카테고리 설정

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageClick = (imageUrl) => {
    navigate("/fullcontent", { state: { bookTitle, recordContent, imageUrl } });
  };

  const extractImageUrl = (htmlContent) => {
    const regex = /<img src="(.*?)"[^>]*>/g;
    const matches = [];
    let match;
    while ((match = regex.exec(htmlContent))) {
      matches.push(match[1]);
    }
    return matches;
  };

  const imageUrls = extractImageUrl(recordContent);

  const handleNoImageClick = () => {
    navigate("/fullcontent", {
      state: { bookTitle, recordContent, imageUrl: null },
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropdown(false);
  };

  return (
    <div className="rrecord-back">
      <div className="header">
        <img className="bbackbutton" src={BackButton} onClick={handleBack} />
        <div className="dropdown-wrapper">
          <div className="dropdown">
            <p onClick={() => setShowDropdown(!showDropdown)}>
              {selectedCategory} <span>⬇</span>
            </p>
            {showDropdown && (
              <div className="dropdown-menu">
                <p onClick={() => handleCategorySelect("2024 가을")}>
                  2024 가을
                </p>
                <p onClick={() => handleCategorySelect("인생 책 모음")}>
                  인생 책 모음
                </p>
                <p onClick={() => handleCategorySelect("2024 여름")}>
                  2024 여름
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rrecord-container">
        <div className="record-check-content">
          <div className="content-row">
            {imageUrls.length > 0 ? (
              imageUrls.map((url, index) => (
                <div className="content-item" key={index}>
                  <div className="image-wrapper">
                    <img
                      src={url}
                      alt={`Content ${index}`}
                      onClick={() => handleImageClick(url)}
                    />
                  </div>
                  <p className="book-title">{bookTitle || "제목 없음"}</p>
                </div>
              ))
            ) : (
              <div className="content-item" onClick={handleNoImageClick}>
                <div className="image-wrapper no-image">
                  <p className="no-image-text">이미지가 없습니다</p>
                </div>
                <p className="book-title">{bookTitle || "제목 없음"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordCheck;
