import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Reel from "../../components/Reel";
import API_BASE_URL from "../../config/api";
import "../../styles/Reels.css";
import BottomNav from "../../components/BottomNav";

const Reels = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRefs = useRef(new Map());
    const containerRef = useRef(null);

    // Fetch food items
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/reels`, {
                    withCredentials: true
                });

                if (response.data.foodItems) {
                    setVideos(response.data.foodItems || []);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Auto play / pause logic
    useEffect(() => {
        if (!videos.length) return;

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
    }, [videos]);

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
                <p>Loading reels...</p>
            </div>
        );
    }

    // Show reels
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

export default Reels;
