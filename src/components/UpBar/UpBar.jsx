import Logo from "../../assets/Logo.png";
import "./UpBar.scss";
import { Link } from "react-router-dom";

const UpBar = () => {
  return (
    <div className="Up-container">
      <Link to="/">
        <img src={Logo} className="logoimg" />
      </Link>
    </div>
  );
};

export default UpBar;
