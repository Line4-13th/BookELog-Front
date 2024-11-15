import { useParams } from "react-router-dom";
import { useState } from "react"; // ✨ useState 추가
import "./CategoryDetail.scss";
import UpBar from "../../components/UpBar/UpBar";
import CategoryTitle from "../../components/Search/CategoryTitle";
import Search from "../../components/Search/Search";
import BookList from "../../components/Search/BookList/BookList";

const CategoryDetail = () => {
  const { category } = useParams(); // URL의 카테고리 파라미터 가져오기
  const [isSearching, setIsSearching] = useState(false); // ✨ 검색 상태 추가

  return (
    <div className="whole">
      <UpBar />
      <CategoryTitle title={category} />

      <div className="center">
        <Search setIsSearching={setIsSearching} /> {/* ✨ 검색 상태 업데이트 */}
        <div>
          {!isSearching && <BookList category={category} />}{" "}
          {/* ✨ 검색 중이 아닐 때만 BookList 렌더링 */}
        </div>
      </div>

      <div className="detail-container"></div>
    </div>
  );
};

export default CategoryDetail;
