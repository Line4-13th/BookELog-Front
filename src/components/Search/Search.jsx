import searchIcon from "../../assets/Search/magnifyingglass.svg";
import "./Search.scss";

const Search = () => {
  return (
    <div className="searchButton">
      <img src={searchIcon} alt="Search Icon" className="searchIcon" />
      <input type="text" placeholder="Search..." className="searchInput" />
    </div>
  );
};

export default Search;
