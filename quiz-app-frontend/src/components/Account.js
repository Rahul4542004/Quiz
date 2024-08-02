import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { getUser } from "../services/AuthService";

const drawerWidth = 240;

export const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(getUser());
    setUser(userData);
  }, []);

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
              Username : {user ? user.username : "Username"}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>

      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Typography variant="h6" gutterBottom>
          Basic Info
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>First Name:</strong>{" "}
                  {user ? user.firstName : "First Name"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Last Name:</strong>{" "}
                  {user ? user.lastName : "Last Name"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12}> */}
          {/* <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Username:</strong> {user ? user.username : "Username"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid> */}
          {/* </Grid> */}
          {/* </Grid> */}
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Email:</strong> {user ? user.email : "Email"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Phone No:</strong> {user ? user.phoneNo : "Phone No"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Gender:</strong> {user ? user.gender : "Gender"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Birthday :</strong> {user ? user.dob : "Gender"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} style={{ padding: "1rem", marginBottom: "1rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  <strong>Institution:</strong>{" "}
                  {user ? user.institution : "Location"}
                </Typography>
              </Grid>
              <Grid item xs={6} style={{ textAlign: "right" }}>
                <Button variant="text" startIcon={<Edit />} color="primary">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Continue with more fields like Birthday, Summary, Website, etc. */}
    </main>
  );
};
