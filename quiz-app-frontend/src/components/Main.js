import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// Define styles for the cards
const StyledCard = styled(Card)({
  maxWidth: 400,
  display: "flex",
  flexDirection: "column",
});

export default function Main() {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      spacing={50} // Space between cards
      padding={20} // Padding around the Stack container
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica.
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
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica.
          </Typography>
        </CardContent>
      </StyledCard>
    </Stack>
  );
}
