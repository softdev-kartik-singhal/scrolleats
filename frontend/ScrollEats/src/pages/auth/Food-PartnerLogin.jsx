import { TextField, Button } from "@mui/material";
import "../../styles/theme.css";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FoodPartnerLogin = () => {

  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await axios.post(
        "https://scrolleats-backend.onrender.com/api/auth/food-partner/login",
        formData,
        { withCredentials: true }
      );

      console.log(response.data);

      // ✅ login success
      Navigate("/create-food");
    } catch (error) {
      console.error(error);

      // 🔴 backend error (wrong email/password, etc.)
      if (error.response) {
        alert(error.response.data.message || "Invalid credentials");
      }
      // 🔴 server / network error
      else {
        alert("Server not reachable. Try again later.");
      }
    }
  };


  return (
    <div className="container auth-wrapper d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-5 col-lg-4">
        <div className="auth-card">
          <h4 className="text-center auth-title">Partner Login</h4>
          <p className="text-center auth-subtitle mb-4">
            Login to your restaurant account
          </p>
          <p className="text-center ">Switch: <Link style={{ textDecoration: "none" }} to={"/user/login"}>User</Link></p>

          <form onSubmit={handleSubmit}>
            <TextField onChange={handleChange} name="email" value={formData.email} label="Email" fullWidth margin="normal" />
            <TextField onChange={handleChange} name="password" value={formData.password} label="Password" type="password" fullWidth margin="normal" />

            <Button type="submit" style={{ width: "100%" }} className="btn btn-secondary" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>

          <div className="auth-footer myColor text-center mt-3">
            New partner? <Link style={{ textDecoration: "none" }} to={"/food-partner/register"}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
