import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RecordCheck.scss";
import BackButton from "../../assets/backbutton_brown.svg";
import BASE_URL from "../../../API_URL"; // API URL

function RecordCheck() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("2024 가을"); // 기본 카테고리 설정
  const [categories, setCategories] = useState([]); // 폴더 카테고리 리스트
  const [previewRecords, setPreviewRecords] = useState([]); // 폴더별 독서기록 미리보기 데이터
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/reading_log/folders/`
        );
        setCategories(response.data);
        setSelectedCategory(response.data[0]?.name || ""); // 첫 번째 카테고리 기본 선택
        fetchPreviewRecords(response.data[0]?.id);
        setError(null);
      } catch (err) {
        console.error("카테고리 데이터를 가져오는 중 오류 발생:", err);
        setError("카테고리 데이터를 가져오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const fetchPreviewRecords = async (folderId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}/api/reading_log/user_reading_logs/folder/${folderId}/`
      );
      setPreviewRecords(response.data);
      setError(null);
    } catch (err) {
      console.error("미리보기 데이터를 가져오는 중 오류 발생:", err);
      setError("미리보기 데이터를 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryName, folderId) => {
    setSelectedCategory(categoryName);
    setShowDropdown(false);
    fetchPreviewRecords(folderId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

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
                {categories.map((category) => (
                  <p
                    key={category.id}
                    onClick={() =>
                      handleCategorySelect(category.name, category.id)
                    }
                  >
                    {category.name}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="rrecord-container">
        <div className="record-check-content">
          <div className="content-row">
            {previewRecords.length > 0 ? (
              previewRecords.map((record) => (
                <div className="content-item" key={record.id}>
                  <div className="image-wrapper">
                    <img
                      src={`${BASE_URL}${record.image}`}
                      alt={record.book_title}
                      onClick={() =>
                        navigate("/fullcontent", {
                          state: {
                            logId: record.id,
                            bookTitle: record.book_title,
                          },
                        })
                      }
                      onError={(e) => {
                        e.target.src = "/path/to/default/image.png"; // 기본 이미지 경로
                      }}
                    />
                  </div>
                  <p className="book-title">
                    {record.book_title || "제목 없음"}
                  </p>
                </div>
              ))
            ) : (
              <div className="content-item no-records">
                <p>이 폴더에 기록이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordCheck;
