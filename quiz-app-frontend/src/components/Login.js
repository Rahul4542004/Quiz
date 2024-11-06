import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, saveUser, setToken } from "../services/AuthService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    const message = sessionStorage.getItem("redirectMessage");
    if (message) {
      toast.error(message);
      setTimeout(() => sessionStorage.removeItem("redirectMessage"), 1000);
    }
  }, []);

  function isBlank(str) {
    return !str || /^\s*$/.test(str);
  }

  const validate = () => {
    const newErrors = {};
    if (isBlank(username)) {
      newErrors.usernameOrEmail = "Username can't be empty";
    }
    if (isBlank(password)) {
      newErrors.password = "Password can't be empty";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }
    const user = { usernameOrEmail: username, password: password };
    login(user)
      .then((response) => {
        const token = "Bearer " + response.data.accessToken;
        saveUser(response.data.user);
        setToken(token);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Incorrect username or password");
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div
        style={{
          backgroundImage: "url(/login2.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "solid 2px black",
              borderRadius: "15px",
              width: "600px",
              backgroundColor: "rgba(255, 255, 255, 0.85)", // Adding a slight background to make it pop on the image
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                width: "600px",
                textAlign: "center",
                background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
                color: "white",
                paddingTop: "10px",
                borderTopRightRadius: "15px",
                borderTopLeftRadius: "15px",
                paddingBottom: "10px",
              }}
            >
              Login
            </Typography>
            <TextField
              placeholder="Enter your username or email"
              label="Username or Email"
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, usernameOrEmail: "" }));
              }}
              sx={{ width: "350px", marginTop: "30px" }}
              helperText={errors.usernameOrEmail || ""}
              error={!!errors.usernameOrEmail}
            />
            <TextField
              placeholder="Enter your password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
              }}
              sx={{ width: "350px", marginTop: "30px" }}
              helperText={errors.password || ""}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              sx={{
                marginTop: "20px",
                background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
              }}
            >
              Sign In
            </Button>
            <Typography
              variant="h6"
              sx={{ marginTop: "10px", marginBottom: "30px", color: "black" }}
            >
              Don't have an account?{" "}
              <Link
                href="/register"
                sx={{ textDecoration: "none", color: "rgba(255,165,0,1.0)" }}
              >
                Sign Up
              </Link>
            </Typography>
          </div>
        </form>
        <ToastContainer
          autoClose={2000}
          position="top-right"
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};
