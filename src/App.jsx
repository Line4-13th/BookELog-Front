import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Category from "./pages/CategoryPage/CategoryPage";
import NavBar from "./components/Navbar";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:category" element={<CategoryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
