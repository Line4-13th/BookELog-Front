// import React from 'react';
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home/Home';
import Curation from './pages/Home/Curation';
import BookSearch from './pages/Record/BookSearch';
import BookDetailPage from './pages/Record/BookDetailPage';
import Record from './pages/Record/Record';
import MyPage from './pages/MyPage/MyPage';
import ProfilePage from './pages/MyPage/ProfilePage';
import MyReviewPage from './pages/MyPage/MyReviewPage';
import QnAPage from './pages/MyPage/QnAPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/curation" element={<Curation />} />
        <Route path="/booksearch" element={<BookSearch />} />
        <Route path="/book-detail" element={<BookDetailPage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/review" element={<MyReviewPage />} />
        <Route path="/qna" element={<QnAPage />} />
      </Routes>
    </Router>
  );
}

export default App;
