import { useState } from "react"; // ✨ useState 추가
import { useNavigate } from "react-router-dom";

import UpBar from "../../components/UpBar/UpBar";
import Search from "../../components/Search/Search";
import Category from "../../components/Search/Category";
import "./CategoryPage.scss";
import CategoryTitle from "../../components/Search/CategoryTitle";
import NavBar from "../../components/Navbar";

const CategoryPage = () => {
  const [isSearching, setIsSearching] = useState(false); // ✨ 검색 상태 관리
  const categories = [
    "시∙에세이",
    "장편 소설",
    "단편 소설",
    "인문학",
    "여행",
    "외국어",
    "ddd",
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`); // 해당 카테고리 경로로 이동
  };

  return (
    <div>
      <UpBar />
      <CategoryTitle title="카테고리" />
      <div className="all">
        <div className="Category">
          {/* ✨ setIsSearching 전달 */}
          <Search setIsSearching={setIsSearching} />

          {/* ✨ isSearching이 false일 때만 카테고리 표시 */}
          {!isSearching && (
            <div className="Category-container">
              {categories.map((category, index) => (
                <Category
                  key={index}
                  title={category}
                  className="grid-container"
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
              <NavBar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
