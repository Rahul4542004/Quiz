import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login, setToken } from "../services/AuthService";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { usernameOrEmail: username, password: password };
    login(user)
      .then((response) => {
        console.log(response.data.username + " successfully logged in");
        const token = "Bearer " + response.data.accessToken;
        setToken(token);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "solid 2px black",
          borderRadius : "15px",
          width: "600px",
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
            borderTopRightRadius : "15px",
            borderTopLeftRadius : "15px",
            paddingBottom: "10px",
          }}
        >
          Login
        </Typography>
        <TextField
          placeholder="Enter your username or email"
          label="Username or Email"
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: "350px", marginTop: "30px" }}
        />
        <TextField
          placeholder="Enter your password"
          label="Password"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ width: "350px", marginTop: "30px" }}
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
          sx={{ marginTop: "10px", marginBottom: "30px" }}
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
  );
};
