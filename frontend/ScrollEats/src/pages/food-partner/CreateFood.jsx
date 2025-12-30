import React, { useState } from "react";
import "../../styles/CreateFood.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: null,
  });

  const { name, description } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("video", formData.video);

    try {
      const res = await axios.post(
        "https://scrolleats-backend.onrender.com/api/food",
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Uploaded:", res.data);
      alert("Food uploaded successfully!");
      navigate("/")
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="food-form-wrapper auth-wrapper d-flex align-items-center justify-content-center">
      <form className="food-form" onSubmit={handleSubmit}>
        <h3 className="form-title">Add Food Item</h3>

        <div className="form-group">
          <label>Food Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter food name"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            rows="3"
            value={description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Upload Video</label>
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Upload Food
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
