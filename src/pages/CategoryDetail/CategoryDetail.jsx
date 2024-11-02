import { useParams } from "react-router-dom";

import UpBar from "../../components/UpBar/UpBar";
import CategoryTitle from "../../components/Search/CategoryTitle";
import "./CategoryDetail.scss";

const CategoryDetail = () => {
  const { category } = useParams(); // URL의 카테고리 파라미터 가져오기

  return (
    <div>
      <UpBar />
      <CategoryTitle title={category} />

      <div className="detail-container"></div>
    </div>
  );
};

export default CategoryDetail;
