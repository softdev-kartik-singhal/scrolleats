import { TextField, Button } from "@mui/material";
import "../../styles/theme.css";
import "../../styles/auth.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";


export default function UserLogin() {

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

    await axios
      .post(
        `${API_BASE_URL}/api/auth/user/login`,
        formData,
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data);

        // ✅ login success
        Navigate("/reels");
      })
      .catch((error) => {
        console.error(error);

        // 🔴 backend error (wrong email/password, user not found, etc.)
        if (error.response) {
          alert(error.response.data.message || "Invalid email or password");
        }
        // 🔴 network / server error
        else {
          alert("Server not reachable. Please try again later.");
        }
      });
  };


  return (
    <>
      <div className="container auth-wrapper d-flex align-items-center justify-content-center">
        <div className="col-12 col-md-5 col-lg-4">
          <div className="auth-card">
            <h4 className="text-center auth-title">User Login</h4>
            <p className="text-center auth-subtitle mb-4">Login to your account</p>
            <p className="text-center ">Switch: <Link style={{ textDecoration: "none" }} to={"/food-partner/login"}>Food Partner</Link></p>

            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                fullWidth
                margin="normal"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <TextField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />

              <Button
                type="submit"
                className="btn btn-secondary mt-3"
                variant="contained"
                fullWidth
                style={{ width: "100%" }}
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>

            <div className="auth-footer myColor text-center mt-3">
              New user? <Link style={{ textDecoration: "none" }} to="/user/register">Create account</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
