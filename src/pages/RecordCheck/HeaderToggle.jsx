// // import React from "react";
// import PropTypes from "prop-types";
// import Dropdown from "../../components/"; // Dropdown 컴포넌트 가져오기
// import "./HeaderToggle.scss";

// function HeaderToggle({
//   selectedFolder,
//   showDropdown,
//   setShowDropdown,
//   handleFolderSelect,
//   handleSave,
// }) {
//   return (
//     <header className="book-detail-header">
//       <button className="back-button">←</button>
//       <Dropdown
//         options={["2024 가을", "인생 책 모음", "2024 여름"]}
//         selectedOption={selectedFolder}
//         onSelect={handleFolderSelect}
//         onToggle={() => setShowDropdown((prev) => !prev)}
//         isOpen={showDropdown}
//       />
//       <button className="save-button" onClick={handleSave}>
//         저장
//       </button>
//     </header>
//   );
// }

// HeaderToggle.propTypes = {
//   selectedFolder: PropTypes.string.isRequired,
//   showDropdown: PropTypes.bool.isRequired,
//   setShowDropdown: PropTypes.func.isRequired,
//   handleFolderSelect: PropTypes.func.isRequired,
//   handleSave: PropTypes.func.isRequired,
// };

// export default HeaderToggle;
