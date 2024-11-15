import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./home.scss";
import Recommend from "./Recommend";
import Curation from "./Curation";
import logo from "../../../public/book-e-log-white.svg";
import profile from "../../assets/profile.svg";
import glass from "../../assets/magnifyingglass.svg";
import API_URL from '../../../API_URL';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    };
    console.log(searchQuery);

    try {
      const response = await axios.get(`${API_URL}/api/books/?search=${searchQuery}`);
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setSearchResults(response.data);
      } else {
        console.error("Unexpected data format:", response.data);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('검색결과 fetch 오류: ', error);
    }
  };

  const handleBookClick = (bookId) => {
    console.log(`Navigating to book detail page with ID: ${bookId}`);
    navigate(`/book/${bookId}`);
  };

  return (
    <div className="home-container">
      <header>
        <div className="home-header">
          <img
            src={logo}
            alt="Book-E-Log logo"
            onClick={() => navigate('/')}
          />
          <img
            src={profile}
            alt="Profile Page"
            onClick={() => {
              isLoggedIn ? navigate('/mypage') : navigate('/login')
            }}
          />
        </div>
        <form className="home-search"  onSubmit={handleSearchSubmit}>
          <img src={glass} alt="Magnifying Glass Icon" />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search + Enter"
            onChange={handleSearchChange}
          />
        </form>
      </header>
      <section className="home-section">
        {searchQuery !== '' ? (
          <div className="home-grid">
            {searchResults.map((book, index) => (
              <div key={index} className="home-book-item">
                <img src={book.cover_image} alt={`${book.title} cover`} className="home-book-cover" />
                <p className="record-book-introduction">{book.introduction}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Recommend />
            <Curation />
          </>
        )}
      </section>
    </div>
  );
}

export default Home;
