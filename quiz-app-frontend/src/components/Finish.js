import React from 'react';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const Finish = () => {
  const { score, totalScore } = useParams();
  const percentage = (score / totalScore) * 100;

  let judgment = '';
  let suggestion = '';

  if (percentage < 60) {
    judgment = 'Needs Improvement';
    suggestion = 'Please visit the resources section and learn more.';
  } else if (percentage >= 60 && percentage <= 80) {
    judgment = 'Good Effort';
    suggestion = 'You did well but can still improve.';
  } else {
    judgment = 'Excellent';
    suggestion = 'Outstanding work! Keep it up.';
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 6 }}>
      <Paper
        elevation={4}
        sx={{
          padding: 4,
          backgroundColor: '#2c2c2c',
          color: '#ffffff',
          borderRadius: '15px',
          boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: 'bold',
            fontSize: '2.5rem',
            marginBottom: 4,
            color: '#ffeb3b',
          }}
        >
          Quiz Results
        </Typography>
        <Box
          sx={{
            backgroundColor: '#424242',
            padding: 3,
            borderRadius: '10px',
            marginBottom: 4,
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontSize: '1.8rem',
              marginBottom: 2,
              color: '#ffeb3b',
            }}
          >
            Your Score: {score} / {totalScore}
          </Typography>
          <Box sx={{ width: '100px', height: '100px', margin: '0 auto' }}>
            <CircularProgressbar
              value={percentage}
              text={`${Math.round(percentage)}%`}
              styles={buildStyles({
                pathColor: '#ffeb3b', 
                textColor: '#ffffff', 
                trailColor: '#424242',
                textSize: '1.5rem',
              })}
            />
          </Box>
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: '#ffeb3b' }}
          >
            Judgment:
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: '1.2rem', fontStyle: 'italic' }}
          >
            {judgment}
          </Typography>
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: '#ffeb3b' }}
          >
            Suggestion:
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
            {suggestion}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#ffeb3b',
              color: '#000000',
              '&:hover': {
                backgroundColor: '#f2d106',
              },
              fontWeight: 'bold',
              padding: '12px 24px',
              borderRadius: '30px',
            }}
            href="/resources"
          >
            Visit Resources
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
