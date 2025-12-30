import { TextField, Button } from "@mui/material";
import "../../styles/theme.css";
import "../../styles/auth.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserRegister() {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
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

    await axios
      .post(
        "https://scrolleats-backend.onrender.com/api/auth/user/register",
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data); // ✅ correct
        Navigate("/");
      })
      .catch((error) => {
        console.error(error);

        if (error.response) {
          alert(error.response.data.message || "Registration failed");
        } else {
          alert("Server not reachable. Try again later.");
        }
      });
  };


  return (
    <div className="container auth-wrapper d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-5 col-lg-4">
        <div className="auth-card">
          <h4 className="text-center auth-title">User Register</h4>
          <p className="text-center auth-subtitle mb-4">Create your account</p>
          <p className="text-center ">Switch: <Link style={{ textDecoration: "none" }} to={"/food-partner/register"}>Food Partner</Link></p>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            <Button
              type="submit"
              className="btn btn-dark"
              style={{ width: "100%" }}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Register
            </Button>
          </form>

          <div className="auth-footer myColor text-center mt-3">
            Already registered? <Link style={{ textDecoration: "none" }} to={"/user/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
