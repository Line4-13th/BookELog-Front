// import React from 'react';
// src/App.jsx
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Curation from "./pages/Home/Curation";
import BookSearch from "./pages/Record/BookSearch";
import BookDetailPage from "./pages/Record/BookDetailPage";
import Record from "./pages/Record/Record";
import MyPage from "./pages/MyPage/MyPage";
import ProfilePage from "./pages/MyPage/ProfilePage";
import MyReviewPage from "./pages/MyPage/MyReviewPage";
import QnAPage from "./pages/MyPage/QnAPage";
import Category from "./pages/CategoryPage/CategoryPage";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import BookDetail from "./pages/BookDetail/BookDetail";
import Question from "./components/ReviewPage/Question";
import AnswerList from "./components/ReviewPage/AnswerList";
import RecordCheck from "./pages/RecordCheck/RecordCheck";
import FullContent from "./pages/RecordCheck/FullContent";
import CurationItem from "./pages/Home/CurationItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<CategoryDetail />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/" element={<Question />} /> {/* 메인 질문 페이지 */}
        <Route path="/answers/:id" element={<AnswerList />} />{" "}
        <Route path="/recordcheck" element={<RecordCheck />} />
        <Route path="/fullcontent" element={<FullContent />} />
        {/* RecordCheck 페이지 */}
        {/* 답변 리스트 페이지 */}
        <Route path="/curation" element={<Curation />} />
        <Route path="/curationItem" element={<CurationItem />} />
        <Route path="/booksearch" element={<BookSearch />} />
        <Route path="/book-detail" element={<BookDetailPage />} />
        <Route path="/record" element={<Record />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/review" element={<MyReviewPage />} />
        <Route path="/qna" element={<QnAPage />} />
      </Routes>
      <NavBar />
    </Router>
  );
}

export default App;
