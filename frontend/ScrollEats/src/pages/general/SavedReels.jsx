import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Reel from "../../components/Reel";
import "../../styles/Reels.css";
import BottomNav from "../../components/BottomNav";

const SavedReels = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const videoRefs = useRef(new Map());
    const containerRef = useRef(null);

    // Fetch saved videos
    useEffect(() => {
        setLoading(true);
        axios
            .get("https://scrolleats-backend.onrender.com/api/food/saved", { withCredentials: true })
            .then((res) => {
                setVideos(res.data.foodItems || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
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

    if (loading) {
        return (
            <>
                <div className="reels-container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white'
                }}>
                    <p>Loading saved reels...</p>
                </div>
                <BottomNav />
            </>
        );
    }

    if (!videos.length) {
        return (
            <>
                <div className="reels-container" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'white',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <p style={{ fontSize: '1.2rem' }}>No saved reels yet</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                        Start saving your favorite food reels!
                    </p>
                </div>
                <BottomNav />
            </>
        );
    }

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

export default SavedReels;
