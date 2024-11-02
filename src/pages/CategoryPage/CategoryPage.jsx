import UpBar from "../../components/UpBar/UpBar";
import Search from "../../components/Search/Search";
import Category from "../../components/Search/Category";

const CategoryPage = () => {
  return (
    <div>
      <UpBar />
      <div className="Category-container">
        <Category />

        <Search />
      </div>
    </div>
  );
};

export default CategoryPage;
