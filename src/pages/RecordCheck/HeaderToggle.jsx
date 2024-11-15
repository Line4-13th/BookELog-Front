import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import BASE_URL from "../../../API_URL"; // API URL

function HeaderToggle({
  selectedFolder,
  setSelectedFolder,
  handleSave,
  onBackClick,
}) {
  const [folders, setFolders] = useState([]); // 폴더 목록 상태
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 상태
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/reading_log/folders/`
        );
        setFolders(response.data);
        setError(null);
      } catch (err) {
        console.error("폴더 데이터를 불러오는 중 오류 발생:", err);
        setError("폴더 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  const handleFolderSelect = (folderName) => {
    setSelectedFolder(folderName);
    setShowDropdown(false);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <header className="book-detail-header">
      <button className="back-button" onClick={onBackClick}>
        ←
      </button>
      <div className="folder-dropdown">
        <p onClick={() => setShowDropdown(!showDropdown)}>{selectedFolder} ⬇</p>
        {showDropdown && (
          <div className="dropdown-menu">
            {folders.map((folder) => (
              <p
                key={folder.id}
                onClick={() => handleFolderSelect(folder.name)}
              >
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
  );
}

HeaderToggle.propTypes = {
  selectedFolder: PropTypes.string.isRequired,
  setSelectedFolder: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default HeaderToggle;
