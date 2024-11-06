import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getToastValue, getUser, isUserLoggedIn, setToastValue } from "../services/AuthService";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  width: "100%",  // Full width within grid item
  maxWidth: 400,  // Default max width for small screens
  height: 450,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  margin: "auto",
  transition: "transform 0.3s ease", // Smooth transition for scale effect
  "&:hover": {
    transform: "scale(1.05)", // Scale up slightly on hover
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add shadow for emphasis
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: 350,  // Increased max width on medium screens
    height: 350,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,  // Further increased max width on large screens
    height: 450,
  },
}));

export default function Main() {
  const navigate = useNavigate();
  const [hasShownToast, setHasShownToast] = useState(getToastValue() || false);

  useEffect(() => {
    if (isUserLoggedIn() && !hasShownToast) {
      const user = JSON.parse(getUser());
      toast.success(`Welcome, ${user.username}`);
      setToastValue(true);
      setHasShownToast(true);
    }
  }, [hasShownToast]);

  useEffect(() => {
    const message = sessionStorage.getItem("registerMessage");
    if (message) {
      toast.success(message);
      setTimeout(() => {
        sessionStorage.removeItem("registerMessage");
      }, 1000);
    }
  }, []);

  useEffect(() => {
    const message = sessionStorage.getItem("redirectMessage");
    if (message) {
      toast.error(message);
      setTimeout(() => sessionStorage.removeItem("redirectMessage"), 1000);
    }
  }, []);

  return (
    <>
    <Box sx={{
      backgroundImage : 'url(/bimg3.jpg)',
      backgroundSize : 'cover',
      backgroundPosition : "center",
      minHeight : "100vh"
    }}>
      <Grid
        container
        spacing={8} // Adjusted spacing
        padding={4}
        justifyContent="center"
        sx={{ maxWidth: "100%", margin: "0 auto" }}
      >
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <StyledCard onClick={() => navigate("/resources")}>
            <CardMedia
              sx={{ height: "60%" }}
              image="/quiz1.jpg"
              title="Resources"
            />
            <CardContent sx={{ backgroundColor : "#778899"}}>
              <Typography gutterBottom variant="h5" component="div">
                RESOURCES
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore a comprehensive collection of educational materials and resources to enhance your knowledge and skills. Find tutorials, guides, and reference materials tailored to your learning needs.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={5} lg={4}>
          <StyledCard onClick={() => navigate("/test")}>
            <CardMedia
              sx={{ height: "60%" }}
              image="/quiz2.jpg"
              title="Test"
            />
            <CardContent sx={{ backgroundColor : "#778899"}}>
              <Typography gutterBottom variant="h5" component="div">
                TEST
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Put your knowledge to the test with a variety of quizzes and challenges. Evaluate your understanding, track your progress, and improve your skills with interactive test modules.
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

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

      </Box>
    </>
  );
}

