// import React from "react";
import PropTypes from "prop-types";

function HeaderToggle({
  selectedFolder,
  showDropdown,
  setShowDropdown,
  handleFolderSelect,
  handleSave,
  onBackClick,
}) {
  return (
    <header className="book-detail-header">
      <button className="back-button" onClick={onBackClick}>
        ←
      </button>
      <div className="folder-dropdown">
        <p onClick={() => setShowDropdown(!showDropdown)}>{selectedFolder} ⬇</p>
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
  );
}

HeaderToggle.propTypes = {
  selectedFolder: PropTypes.string.isRequired,
  showDropdown: PropTypes.bool.isRequired,
  setShowDropdown: PropTypes.func.isRequired,
  handleFolderSelect: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default HeaderToggle;
