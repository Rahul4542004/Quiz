import React from "react";
import "./Main.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./ImageSlider";

export function Test() {
  const navigate = useNavigate();

  return (
    <>
      <ImageSlider />
    </>
  );
}
