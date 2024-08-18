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
  let {subject,topic} = useParams();
  const temp = subject;
  if(subject === "os"){
    subject = "Operating Systems"
  }
  else if(subject === "dbms"){
    subject = "Database Management System"
  }
  else if(subject === "cns"){
    subject = "Computer Network And Security"
  }
  else{
    subject = "Object Oriented Programming"
  }
  const formatTopic = (topic) => {
    return topic
      .split("-")
      .map((part) => part.toUpperCase())
      .join(" ");
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/test/${temp}/${topic}`)
  }
  return (
    <Container>
      <Card sx={{ padding: 3, marginTop: 6 }}>
        <center>
        <Typography variant="h4" gutterBottom>
          {subject.toUpperCase()}  {topic === "main" ? "" : " - " + formatTopic(topic)}
        </Typography>
        </center>
        <Typography variant="body1" gutterBottom>
          <strong>DISCLAIMER for INTELLIQUEST Test</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          1. The paper pattern of our Intelliquest Test is a little different
          from the other websites pattern as we want all the aspirants to stay
          one step ahead in terms of preparation.
        </Typography>
        <Typography variant="body2" gutterBottom>
          2. The test is of 5 minutes duration.
        </Typography>
        <Typography variant="body2" gutterBottom>
          3. The mock test consists of {topic==="main" ? "30" : "15"} questions. The maximum marks are 15.
        </Typography>

        <Typography variant="body1" gutterBottom>
          <strong>Types of Tests in Intelliquest</strong>
        </Typography>
        <Typography variant="body2" gutterBottom>
          1. It consists of four core Computer Science Subjects <br /> (i)
          Operating System <br /> (ii) DataBase Management System
          <br /> (iii) Computer Networks <br /> (iv) Oject Oriented Programming
        </Typography>
        <Typography variant="body2" gutterBottom>
          2. The paper consists of 90 questions. The maximum marks are 300.
        </Typography>
        <Typography variant="body2" gutterBottom>
          3.Each Subject is divided into 4 sub Categories . Each Sub Category
          consists of separate test which can be taken by user.
        </Typography>
        <Typography variant="body2" gutterBottom>
          4. There is a concept of Overall Test , which test all concepts of
          that subject.
        </Typography>
        <Box component="div" sx={{ marginLeft: 2 }}>
          <Typography variant="body2" gutterBottom>
            <strong>Preparation : </strong> There is a resource provided to each
            of the user at start of the website.
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Result : </strong> There is a result page at end of each
            test which evaluates their respective performance.
          </Typography>
        </Box>
        <Typography variant="body2" gutterBottom>
         5. Please be thorough with subject before attempting the test.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <Typography variant="body2">
            I have read the instructions and I understand that if I escape the
            full screen mode, my test will be auto-submitted. Check the box on
            the left to start the test.
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button variant="contained" color="primary" disabled={!isChecked} onClick={handleClick}>
            Start test
          </Button>
        </Box>
      </Card>
    </Container>
  );
}
