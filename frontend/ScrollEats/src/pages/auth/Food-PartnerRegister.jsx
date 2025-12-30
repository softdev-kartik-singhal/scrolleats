import { TextField, Button } from "@mui/material";
import "../../styles/theme.css";
import "../../styles/auth.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FoodPartnerRegister = () => {

  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactName: "",
    phone: "",
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

    try {
      const response = await axios.post(
        "https://scrolleats-backend.onrender.com/api/auth/food-partner/register",
        formData,
        { withCredentials: true }
      );

      console.log(response.data);

      Navigate("/create-food");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Registration failed");
      } else {
        alert("Server not reachable");
      }
    }
  };



  return (
    <div className="container auth-wrapper d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-6 col-lg-4">
        <div className="auth-card">
          <h4 className="text-center auth-title">Food Partner Register</h4>
          <p className="text-center auth-subtitle mb-4">
            Create your food partner account
          </p>
          <p className="text-center ">Switch: <Link style={{ textDecoration: "none" }} to={"/user/register"}>User</Link></p>

          <form onSubmit={handleSubmit}>
            <TextField name="name" value={formData.name} onChange={handleChange} label="Business Name" fullWidth margin="normal" />

            {/* 👇 Contact Name + Phone in same row */}
            <div className="row">
              <div className="col-12 col-md-6">
                <TextField name="contactName" value={formData.contactName} onChange={handleChange} label="Contact Name" fullWidth margin="normal" />
              </div>
              <div className="col-12 col-md-6">
                <TextField name="phone" value={formData.phone} onChange={handleChange} label="Phone No." fullWidth margin="normal" />
              </div>
            </div>

            <TextField name="email" value={formData.email} onChange={handleChange} label="Email" fullWidth margin="normal" />
            <TextField
              value={formData.password}
              name="password"
              label="Password"
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
            />
            <TextField name="address" value={formData.address} onChange={handleChange} label="Address" fullWidth margin="normal" />

            <Button
              type="submit"
              style={{ width: "100%" }}
              className="btn btn-secondary"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>

          <div className="auth-footer myColor text-center mt-3">
            Already registered? <Link style={{ textDecoration: "none" }} to={"/food-partner/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
