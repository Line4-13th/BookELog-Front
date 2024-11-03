import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/CategoryPage/CategoryPage";
import NavBar from "./components/Navbar";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import BookDetail from "./pages/BookDetail/BookDetail";
// import UpBar from "./components/UpBar/UpBar";

function App() {
  return (
    <Router>
      {/* <UpBar /> */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<CategoryDetail />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
