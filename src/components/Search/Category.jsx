import book from "../../assets/Search/OpenBook.png";
import "./Category.scss";

const Category = ({ title }) => {
  return (
    <div className="container">
      <img src={book} alt="" />
      <p>{title}</p>
      {/* 여기서 title 부분 상위 페이지 컴포넌트에서 props로 넘기기 */}
    </div>
  );
};

export default Category;
