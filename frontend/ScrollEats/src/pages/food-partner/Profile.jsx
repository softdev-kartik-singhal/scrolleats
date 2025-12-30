import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styles/Profile.css";

const Profile = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/food-partner/${id}`,
          { withCredentials: true }
        );

        await setStore(res.data.foodPartner);
        await setVideos(res.data.foodItems);
      } catch (error) {
        console.error("Error fetching store:", error);
      }
    };

    fetchStore();
  }, [id]);

  return (
    <div className="store-container">
      {/* HEADER */}
      <div className="store-header p-4 mb-5">
        <div className=" store-top d-flex justify-content-between align-items-center">
          <div className="pl-5 store-avatar">
            <img
              src="https://plus.unsplash.com/premium_photo-1661953124283-76d0a8436b87?q=80&w=2088&auto=format&fit=crop"
              alt="Profile"
            />
          </div>

          <div className="store-info">
            <div className="store-pill">{store?.name || "Business Name"}</div>
            <div className="store-pill">{store?.address || "Address"}</div>
          </div>
        </div>

        <div className="store-stats">
          <div>
            <p className="stat-label">total meals</p>
            <p className="stat-value text-center">{videos.length}</p>
          </div>
          <div>
            <p className="stat-label">customers served</p>
            <p className="stat-value text-center ">15K</p>
          </div>
        </div>
      </div>

      {/* VIDEOS */}
      <div className="video-grid mt-5">
        {videos.length === 0 ? (
          <p style={{ textAlign: "center" }}>No videos uploaded yet</p>
        ) : (
          videos.map((item) => (
            <div key={item._id} className="video-box">
              <video src={item.video} loop muted playsInline />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Profile;
