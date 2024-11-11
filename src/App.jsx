import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/CategoryPage/CategoryPage";
import NavBar from "./components/Navbar";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import BookDetail from "./pages/BookDetail/BookDetail";
import Question from "./components/ReviewPage/Question";
import AnswerList from "./components/ReviewPage/AnswerList";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<CategoryDetail />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/" element={<Question />} /> {/* 메인 질문 페이지 */}
        <Route path="/answers/:id" element={<AnswerList />} />{" "}
        {/* 답변 리스트 페이지 */}
      </Routes>
    </Router>
  );
}

export default App;
