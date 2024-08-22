import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getToastValue, getUser, isUserLoggedIn, setToastValue } from "../services/AuthService";
import "react-toastify/dist/ReactToastify.css";
const StyledCard = styled(Card)({
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
});

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

  return (
    <>
      <Stack
        direction="row"
        spacing={50}
        padding={20}
      >
        <StyledCard onClick={() => navigate("/resources")}>
          <CardMedia
            sx={{ height: 240 }}
            image="/quiz1.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              RESOURCES
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Explore a comprehensive collection of educational materials and resources to enhance your knowledge and skills. Find tutorials, guides, and reference materials tailored to your learning needs.
            </Typography>
          </CardContent>
        </StyledCard>

        <StyledCard onClick={() => navigate("/test")}>
          <CardMedia
            sx={{ height: 240 }}
            image="/quiz2.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              TEST
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Put your knowledge to the test with a variety of quizzes and challenges. Evaluate your understanding, track your progress, and improve your skills with interactive test modules.
            </Typography>
          </CardContent>
        </StyledCard>
      </Stack>
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
    </>
  );
}
