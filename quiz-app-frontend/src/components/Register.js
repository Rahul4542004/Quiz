import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/AuthService";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ToastContainer,toast } from "react-toastify";
export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const phoneRegex = /^\d{10}$/;
  const firstNameRegex = /^[A-Za-z\s]{1,20}$/;
  const lastNameRegex = /^[A-Za-z\s]{1,20}$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!firstName) {
      newErrors.firstName = "This is a mandatory field";
    } else if (!firstNameRegex.test(firstName)) {
      newErrors.firstName = "Should not exceed 20 characters and contains only Alphabets";
    }

    if (!lastName) {
      newErrors.lastName = "This is a mandatory field";
    } else if (!lastNameRegex.test(lastName)) {
      newErrors.lastName = "Should not exceed 20 characters and contains only Alphabets";
    }

    if (!username) {
      newErrors.username = "This is a mandatory field";
    }

    if (!email) {
      newErrors.email = "This is a mandatory field";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email id";
    }

    if (!password) {
      newErrors.password = "This is a mandatory field";
    } else if (!passwordRegex.test(password)) {
      newErrors.password = "Password must be at least 8 characters long, contain at least one uppercase letter, and one special character.";
    }

    if (phoneNo && !phoneRegex.test(phoneNo)) {
      newErrors.phoneNo = "Invalid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const user = { firstName, lastName, username, email, password, phoneNo };
    register(user)
      .then((response) => {
        toast.success("User successfully registered")
        setTimeout(() => navigate('/'),2000);
      })
      .catch((err) => {
        if (err.response) {
          const { status, data } = err.response;
          if (status === 409) {
            setErrorMessage(data);
          } else {
            setErrorMessage("Unexpected error occurred");
          }
        } else {
          setErrorMessage("Network error. Please try again later");
        }
        setOpen(true);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      style={{ display: "flex", justifyContent: "center", marginTop: "80px", marginBottom: "80px" }}
      onSubmit={handleSubmit}
      noValidate
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "solid 2px black",
          borderRadius: "15px",
          width: "800px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            width: "800px",
            textAlign: "center",
            background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
            color: "white",
            paddingTop: "10px",
            paddingBottom: "10px",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          Register
        </Typography>
        <div style={{ display: "flex" }}>
          <TextField
            placeholder="Enter your first name"
            label="First Name"
            onChange={(e) => { 
              setFirstName(e.target.value);
              setErrors(prevErrors => ({...prevErrors,firstName : ""}));
            }}
            sx={{ width: "350px", marginTop: "30px", marginRight: "25px" }}
            error={!!errors.firstName}
            helperText={errors.firstName}
            required
          />
          <TextField
            placeholder="Enter your last name"
            required
            label="Last Name"
            onChange={(e) => { 
              setLastName(e.target.value);
              setErrors(prevErrors => ({...prevErrors,lastName : ""}));
            }}
            sx={{ width: "350px", marginTop: "30px" }}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </div>

        <div style={{ display: "flex" }}>
          <TextField
            required
            placeholder="Set your username"
            label="Username"
            onChange={(e) => { 
              setUsername(e.target.value);
              setErrors(prevErrors => ({...prevErrors,username : ""}));
            }}
            sx={{ width: "350px", marginTop: "30px", marginRight: "25px" }}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            placeholder="Please enter a valid email"
            label="Email"
            required
            onChange={(e) => { 
              setEmail(e.target.value);
              setErrors(prevErrors => ({...prevErrors,email : ""}));
            }}
            sx={{ width: "350px", marginTop: "30px" }}
            error={!!errors.email}
            helperText={errors.email}
          />
        </div>

        <div style={{ display: "flex" }}>
          <TextField
            required
            placeholder="Keep a strong password"
            label="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => { 
              setPassword(e.target.value);
              setErrors(prevErrors => ({...prevErrors,password : ""}));
            }}
            sx={{ width: "350px", marginTop: "30px", marginRight: "25px" }}
            error={!!errors.password}
            helperText={errors.password}
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

          <TextField
            placeholder="Enter your valid phone number"
            label="Phone Number"
            onChange={(e) => { 
              setPhoneNo(e.target.value);
              setErrors(prevErrors => ({...prevErrors,phoneNo : ""}));
            }}
            sx={{ width: "350px", marginTop: "30px" }}
            error={!!errors.phoneNo}
            helperText={errors.phoneNo}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: "30px",
            fontSize: "17px",
            background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
          }}
        >
          Sign Up
        </Button>
        <Typography
          variant="h6"
          sx={{ marginTop: "30px", marginBottom: "30px" }}
        >
          Have an account?{" "}
          <Link
            href="/login"
            sx={{ textDecoration: "none", color: "rgba(255,165,0,1.0)" }}
          >
            Sign In
          </Link>
        </Typography>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}

      >
        <DialogTitle sx={{ fontWeight: "bold" }}>Error</DialogTitle>
        <DialogContent>
          <Typography >{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            sx={{
              background: "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
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
    </form>
  );
};
