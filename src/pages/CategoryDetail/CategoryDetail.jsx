import { useParams } from "react-router-dom";
import "./CategoryDetail.scss";
// import UpBar from "../../components/UpBar/UpBar";
import CategoryTitle from "../../components/Search/CategoryTitle";
import Search from "../../components/Search/Search";

const CategoryDetail = () => {
  const { category } = useParams(); // URL의 카테고리 파라미터 가져오기

  return (
    <div>
      {/* <UpBar /> */}
      <CategoryTitle title={category} />
      <div className="center">
        <Search />
      </div>

      <div className="detail-container"></div>
    </div>
  );
};

export default CategoryDetail;
