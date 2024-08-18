import React, { useState } from "react";
import {
  Container,
  Card,
  Typography,
  Checkbox,
  Button,
  Box,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export default function Instructions() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  let { subject, topic } = useParams();
  const temp = subject;
  const subjectMap = {
    os: "Operating Systems",
    dbms: "Database Management System",
    cns: "Computer Network and Security",
    default: "Object Oriented Programming"
  };
  subject = subjectMap[subject] || subjectMap.default;
  const formatTopic = (topic) => {
    return topic
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/test/${temp}/${topic}`);
  };

  return (
    <Container
      maxWidth="false"
      disableGutters
      sx={{
        height: '100vh',
        padding: 0,
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Card
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#1e1e1e',
          color: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
          overflow: 'auto' // Ensure content is scrollable if needed
        }}
      >
        <center>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: '#ffeb3b' }}
          >
            {subject.toUpperCase()} {topic === "main" ? "" : " - " + formatTopic(topic)}
          </Typography>
        </center>
        <Typography variant="body1" gutterBottom>
          <strong>Disclaimer</strong>
        </Typography>
        <Typography variant="body2" paragraph>
          1. The paper pattern of our Intelliquest Test differs from other websites to ensure aspirants stay ahead in their preparation.
        </Typography>
        <Typography variant="body2" paragraph>
          2. The test duration is 5 minutes.
        </Typography>
        <Typography variant="body2" paragraph>
          3. The mock test includes {topic === "main" ? "30" : "15"} questions, with a maximum score of 15 marks.
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>Types of Tests in Intelliquest</strong>
        </Typography>
        <Typography variant="body2" paragraph>
          1. Tests cover four core Computer Science subjects:
          <Box component="ul" sx={{ paddingLeft: '20px', listStyleType: 'none' }}>
            <Box component="li" sx={{ marginBottom: '4px' }}>Operating Systems</Box>
            <Box component="li" sx={{ marginBottom: '4px' }}>Database Management System</Box>
            <Box component="li" sx={{ marginBottom: '4px' }}>Computer Networks</Box>
            <Box component="li">Object Oriented Programming</Box>
          </Box>
        </Typography>
        <Typography variant="body2" paragraph>
          2. Each Subject is divided into 4 subcategories, with separate tests for each.
        </Typography>
        <Typography variant="body2" paragraph>
          3. An overall test evaluates all concepts of the subject.
        </Typography>
        <Box component="div" sx={{ marginLeft: 2 }}>
          <Typography variant="body2" paragraph>
            <strong>Preparation:</strong> Resources are provided at the start of the website.
          </Typography>
          <Typography variant="body2" paragraph>
            <strong>Result:</strong> Results are evaluated on a dedicated page at the end of each test.
          </Typography>
        </Box>
        <Typography variant="body2" paragraph>
          4. Ensure you are well-prepared before attempting the test.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} sx={{ color: '#ffeb3b' }} />
          <Typography variant="body2" sx={{ color: '#ffffff' }}>
            I have read and understood the instructions. If I exit full screen mode, my test will be auto-submitted. Check the box to start the test.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button
            variant="contained"
            disabled={!isChecked}
            onClick={handleClick}
            sx={{
              backgroundColor: "#ffeb3b",
              color: "#000000",
              '&:hover': {
                backgroundColor: '#f2d106',
              },
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '4px',
              fontSize: '16px',
              minWidth: '120px',
            }}
          >
            Start Test
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
