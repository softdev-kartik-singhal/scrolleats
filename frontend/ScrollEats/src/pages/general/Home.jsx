import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Reel from "../../components/Reel";
import "../../styles/Reels.css";
import BottomNav from "../../components/BottomNav";
import LandingPage from "./LandingPage";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/food", {
          withCredentials: true
        });

        if (response.data.foodItems) {
          setIsAuthenticated(true);
          setVideos(response.data.foodItems || []);
        }
      } catch (error) {
        // User is not authenticated
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Auto play / pause logic
  useEffect(() => {
    if (!videos.length || !isAuthenticated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
            video.play().catch(() => { });
          } else {
            video.pause();
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.7,
      }
    );

    videoRefs.current.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [videos, isAuthenticated]);

  const setVideoRef = (id) => (el) => {
    if (!el) return;
    videoRefs.current.set(id, el);
  };

  // Show loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#000',
        color: '#fff'
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Show landing page if not authenticated
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  // Show reels if authenticated
  return (
    <>
      <div ref={containerRef} className="reels-container">
        {videos.map((video) => (
          <Reel key={video._id} video={video} setVideoRef={setVideoRef} />
        ))}
      </div>

      <BottomNav />
    </>
  );
};

export default Home;
