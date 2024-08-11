import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import { getUser, saveUser, updateInformation } from "../services/AuthService";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const drawerWidth = 240;

export const Account = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(dayjs());
  const [institution, setInstitution] = useState("");

  const initialState = {
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    phoneNo: false,
    gender: false,
    birthday: false,
    institution: false,
  };
  const [editOption, setEditOption] = useState(initialState);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    institution: "",
  });

  useEffect(() => {
    const userData = JSON.parse(getUser());
    setUser(userData);
    setFirstName(userData.firstName || "");
    setLastName(userData.lastName || "");
    setEmail(userData.email || "");
    setPhoneNo(userData.phoneNo || "");
    setGender(userData.gender || "");
    setBirthday(userData.dob ? dayjs(userData.dob) : dayjs());
    setInstitution(userData.institution || "");
  }, []);

  const navigator = useNavigate();

  function updateInfo() {
    const isValidFirstName = handleValidation("firstName", firstName);
    const isValidLastName = handleValidation("lastName", lastName);
    const isValidEmail = handleValidation("email", email);
    const isValidPhoneNo = handleValidation("phoneNo", phoneNo);
    const isValidInstitution = handleValidation("institution", institution);

    if (
      isValidFirstName &&
      isValidLastName &&
      isValidEmail &&
      isValidPhoneNo &&
      isValidInstitution
    ) {
      const currentUser = {
        firstName,
        lastName,
        email,
        phoneNo,
        gender,
        dob: birthday ? birthday.format("YYYY-MM-DD") : "",
        institution,
        username: user.username,
      };

      setUser(currentUser);
      saveUser(currentUser);
      updateInformation(currentUser)
        .then((response) => {
          if (response.data !== "No changes detected") {
            toast.success(response.data);
          }
          navigator("/account");
        })
        .catch((err) => {
          toast.error("An error occurred while updating information.");
        });
    } else {
      toast.error("Please fix the validation errors before saving.");
    }
  }

  const handleValidation = (field, value) => {
    let error = "";

    switch (field) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Name should contain only alphabets";
        }
        break;

      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) {
          error = "Enter a valid email address";
        }
        break;

      case "phoneNo":
        if (!/^[0-9]{10}$/.test(value)) {
          error = "Phone number should be a 10-digit number";
        }
        break;

      case "institution":
        if (value.length > 50) {
          error = "Institution name should be less than 50 characters";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: error,
    }));

    return error === "";
  };

  const handleSave = (field, originalValue, updatedValue) => {
    if (handleValidation(field, updatedValue)) {
      updateInfo();
    } else {
      switch (field) {
        case "firstName":
          setFirstName(originalValue);
          break;
        case "lastName":
          setLastName(originalValue);
          break;
        case "email":
          setEmail(originalValue);
          break;
        case "phoneNo":
          setPhoneNo(originalValue);
          break;
        case "institution":
          setInstitution(originalValue);
          break;
        default:
          break;
      }
    }
    setEditOption((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  return (
    <main style={{ flexGrow: 1, padding: "1rem" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        style={{ marginBottom: "1rem" }}
      >
        <Toolbar>
          <Avatar
            alt={user ? user.firstName : ""}
            src={user ? user.photographURL : ""}
            sx={{ width: 80, height: 80, marginRight: "1rem" }}
          />
          <div>
            <Typography variant="h5">
              {user ? `${user.firstName} ${user.lastName}` : "User Name"}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Username: {user ? user.username : "Username"}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Typography
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
          variant="h5"
          gutterBottom
        >
          Basic Info
        </Typography>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              {!editOption.firstName ? (
                <Grid item xs={6}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>First Name:</strong> {user ? user.firstName : ""}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <strong>First Name:</strong>{" "}
                    <TextField
                      autoFocus
                      sx={{
                        marginLeft: "5px",
                        width: "300px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        handleValidation("firstName", e.target.value);
                      }}
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName}
                    />
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    handleSave("firstName", user.firstName, firstName);
                  }}
                  variant="text"
                  startIcon={!editOption.firstName ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.firstName ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Last Name */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              {!editOption.lastName ? (
                <Grid item xs={6}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Last Name:</strong> {user ? user.lastName : ""}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <strong>Last Name:</strong>{" "}
                    <TextField
                      autoFocus
                      sx={{
                        marginLeft: "5px",
                        width: "300px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        handleValidation("lastName", e.target.value);
                      }}
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName}
                    />
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    handleSave("lastName", user.lastName, lastName);
                  }}
                  variant="text"
                  startIcon={!editOption.lastName ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.lastName ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              {!editOption.email ? (
                <Grid item xs={6}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Email:</strong> {user ? user.email : ""}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <strong>Email:</strong>{" "}
                    <TextField
                      autoFocus
                      sx={{
                        marginLeft: "5px",
                        width: "300px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        handleValidation("email", e.target.value);
                      }}
                      error={Boolean(errors.email)}
                      helperText={errors.email}
                    />
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    handleSave("email", user.email, email);
                  }}
                  variant="text"
                  startIcon={!editOption.email ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.email ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Phone No */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              {!editOption.phoneNo ? (
                <Grid item xs={6}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Phone No:</strong> {user ? user.phoneNo : ""}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <strong>Phone No:</strong>{" "}
                    <TextField
                      autoFocus
                      sx={{
                        marginLeft: "5px",
                        width: "300px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                      value={phoneNo}
                      onChange={(e) => {
                        setPhoneNo(e.target.value);
                        handleValidation("phoneNo", e.target.value);
                      }}
                      error={Boolean(errors.phoneNo)}
                      helperText={errors.phoneNo}
                    />
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    handleSave("phoneNo", user.phoneNo, phoneNo);
                  }}
                  variant="text"
                  startIcon={!editOption.phoneNo ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.phoneNo ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Gender */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Gender:</strong>
                </Typography>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  disabled={!editOption.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    if (editOption.gender) {
                      handleSave("gender", user.gender, gender);
                    }
                    else{
                      setEditOption((prevState) => ({
                        ...prevState,
                        gender: !prevState.gender,
                      }));
                    }
                  }}
                  variant="text"
                  startIcon={!editOption.gender ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.gender ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Birthday */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Birthday:</strong>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={birthday}
                    onChange={(newDate) => setBirthday(newDate)}
                    disabled={!editOption.birthday}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    if(editOption.birthday)
                      handleSave("birthday",user.dob,birthday);
                    else{
                      setEditOption((prevState) => ({
                        ...prevState,
                        birthday: !prevState.birthday,
                      }));
                    }
                  }}
                  variant="text"
                  startIcon={!editOption.birthday ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.birthday ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {/* Institution */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              {!editOption.institution ? (
                <Grid item xs={6}>
                  <Typography variant="body1" color="textSecondary">
                    <strong>Institution:</strong> {user ? user.institution : ""}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <strong>Institution:</strong>{" "}
                    <TextField
                      autoFocus
                      sx={{
                        marginLeft: "5px",
                        width: "300px",
                        "& .MuiInputBase-root": {
                          height: "40px",
                        },
                      }}
                      value={institution}
                      onChange={(e) => {
                        setInstitution(e.target.value);
                        handleValidation("institution", e.target.value);
                      }}
                      error={Boolean(errors.institution)}
                      helperText={errors.institution}
                    />
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button
                  onClick={() => {
                    handleSave("institution", user.institution, institution);
                  }}
                  variant="text"
                  startIcon={!editOption.institution ? <Edit /> : <Save />}
                  color="primary"
                >
                  {!editOption.institution ? "Edit" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
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
    </main>
  );
};
