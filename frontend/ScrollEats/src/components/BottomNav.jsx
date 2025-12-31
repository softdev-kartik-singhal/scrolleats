import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "../styles/Reels.css";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to="/reels" className={location.pathname === "/reels" ? "active" : ""}>
        <HomeIcon />
        <span>Home</span>
      </Link>

      <Link to="/saved" className={location.pathname === "/saved" ? "active" : ""}>
        <BookmarkIcon />
        <span>Saved</span>
      </Link>
    </div>
  );
};

export default BottomNav;
