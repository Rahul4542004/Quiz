import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import "./Main.css";

export function Test() {
  const navigate = useNavigate();

  return (
    <>
      {/* Main container for the image slider */}
      <div className="container">
        <div className="image-slider">
          <ImageSlider />
        </div>
      </div>
    </>
  );
}
