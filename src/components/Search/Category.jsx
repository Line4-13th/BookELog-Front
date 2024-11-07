import book from "../../assets/Search/OpenBook.png";
import "./Category.scss";

const Category = ({ title, onClick }) => {
  return (
    <div className="category-container">
      <div className="category-item" onClick={onClick}>
        {" "}
        {/* 클릭 이벤트 추가 */}
        <img src={book} alt="Book Icon" />
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Category;
