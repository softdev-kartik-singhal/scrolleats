import React, { useEffect, useState } from "react";
import "../styles/Reels.css";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MessageIcon from "@mui/icons-material/Message";
import API_BASE_URL from "../config/api";

const Reel = ({ video, setVideoRef }) => {

  const userId = localStorage.getItem("userId");

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  // Initialize state from backend data
  useEffect(() => {
    if (!video) return;

    setLikesCount(video.likesCount || 0);

    if (Array.isArray(video.likedBy)) {
      setLiked(video.likedBy.includes(userId));
    }

    if (Array.isArray(video.savedBy)) {
      setSaved(video.savedBy.includes(userId));
    }
  }, [video, userId]);

  // ---------------- LIKE ----------------
  const handleLike = async () => {
    const prevLiked = liked;
    const prevCount = likesCount;

    setLiked(!prevLiked);
    setLikesCount(prevLiked ? prevCount - 1 : prevCount + 1);

    try {
      await fetch(`${API_BASE_URL}/api/food/like`, {
        method: "POST",
        credentials: "include", // ⭐ IMPORTANT
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodId: video._id }),
      });
    } catch (err) {
      setLiked(prevLiked);
      setLikesCount(prevCount);
    }
  };


  // ---------------- SAVE ----------------
  const handleSave = async () => {
    const prevSaved = saved;
    setSaved(!prevSaved);

    try {
      await fetch(`${API_BASE_URL}/api/food/save`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodId: video._id }),
      });
    } catch (err) {
      setSaved(prevSaved);
    }
  };


  return (
    <div className="reel">
      <video
        ref={setVideoRef(video._id)}
        src={video.video}
        className="reel-video"
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        controlsList="nodownload"
      />

      {/* RIGHT ACTIONS */}
      <div className="reel-actions">
        <div className="action" onClick={handleLike}>
          {liked ? (
            <FavoriteIcon style={{ color: "#e0245e" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
          <span>{likesCount}</span>
        </div>

        <div className="action" onClick={handleSave}>
          {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          <span>{saved ? "Saved" : "Save"}</span>
        </div>

        <div className="action">
          <MessageIcon />
          <span>{video.commentsCount || 0}</span>
        </div>
      </div>

      {/* BOTTOM INFO */}
      <div className="reel-info">
        <p className="reel-description">{video.description}</p>

        <Link to={`/food-partner/${video.foodPartner}`} className="visit-btn">
          Visit Store
        </Link>
      </div>
    </div>
  );
};

export default Reel;
