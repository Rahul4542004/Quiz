import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateScoreForCns, calculateScoreForDbms, calculateScoreForOops, calculateScoreForOs, getCNS, getCNSByTopic, getDBMS, getDBMSByTopic, getOOPS, getOOPSByTopic, getOS, getOSByTopic, getTime, saveTest, setTime } from '../services/QuizService';
import { FormControl, FormControlLabel, Typography, Checkbox, Button, Box, Container, Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { saveScore } from '../services/QuizService';
export const Quiz = () => {
    let { subject, topic } = useParams();
    const [idx, setIdx] = useState(JSON.parse(localStorage.getItem('currentQuizIdx')) || 0);
    const [currentData, setCurrentData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const navigate = useNavigate();
    localStorage.setItem("canReach","true");
    let subject2;
    if(subject==="os"){
        subject2 = "Operating Systems";
    }
    else if(subject==="dbms"){
        subject2 = "Database Management System"
    }
    else if(subject==="oops"){
        subject2 = "Object Oriented Programming"
    }
    else{
        subject2 = "Computer Networks & Security"
    }
    useEffect(() => {
        const time = getTime();
        if (time !== null) {
            try {
                setTimeLeft(JSON.parse(time)); 
            } catch (error) {
                console.error("Error parsing time from storage:", error);
                setTimeLeft(topic === "main" ? 1800 : 600); 
            }
        } else {
            const initialTime = topic === "main" ? 1800 : 600;
            setTimeLeft(initialTime);
            setTime(initialTime);
        }
    }, []); 

    useEffect(() => {
        localStorage.setItem("subject", subject);
        localStorage.setItem("topic", topic);
        const message = sessionStorage.getItem("redirectMessage");
        if (message) {
            setSnackbarMessage(message);
            setOpenSnackbar(true);
            setTimeout(() => sessionStorage.removeItem("redirectMessage"), 1000);
        }
    }, []);

    useEffect(() => {
        const fetchQuestions = async () => {
            const storedData = JSON.parse(localStorage.getItem('currentQuizData'));
            const storedIdx = JSON.parse(localStorage.getItem('currentQuizIdx'));
            if (storedData && storedIdx !== null && storedData.length > 0) {
                setCurrentData(storedData);
                setIdx(storedIdx);
                setSelectedOption(storedData[storedIdx].option);
            } else {
                try {
                    let response;
                    if (subject === 'os') {
                        response = topic === "main" ? await getOS() : await getOSByTopic(topic);
                    } else if (subject === 'cns') {
                        response = topic === "main" ? await getCNS() : await getCNSByTopic(topic);
                    } else if (subject === 'dbms') {
                        response = topic === "main" ? await getDBMS() : await getDBMSByTopic(topic);
                    } else if (subject === 'oops') {
                        response = topic === "main" ? await getOOPS() : await getOOPSByTopic(topic);
                    }

                    const data = response.data;
                    saveTest(data);
                    setCurrentData(data);
                    localStorage.setItem('currentQuizData', JSON.stringify(data));
                    localStorage.setItem('currentQuizIdx', JSON.stringify(0));
                    setIdx(0);
                    setSelectedOption(data[0].option);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchQuestions();
    }, [subject, topic]);

    useEffect(() => {
        localStorage.setItem('currentQuizIdx', JSON.stringify(idx));
    }, [idx]);

    useEffect(() => {
        if (currentData.length > 0) {
            setSelectedOption(currentData[idx].option);
        }
    }, [idx, currentData]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    handleSubmit(); 
                }
                const newTimeLeft = prevTime - 1;
                setTime(newTimeLeft);
                return newTimeLeft;
            });
        }, 1000);
    
        return () => clearInterval(timer);
    }, [currentData]);
    

    const handleNext = () => {
        if (idx < currentData.length - 1) {
            setIdx(idx + 1);
        }
    };

    const handlePrevious = () => {
        if (idx > 0) {
            setIdx(idx - 1);
        }
    };

    const handleOptionChange = (e) => {
        const selectedValue = e.target.value;
        const updatedData = [...currentData];
        if (selectedValue === selectedOption) {
            setSelectedOption(null);
            updatedData[idx].option = null;
        } else {
            setSelectedOption(selectedValue);
            updatedData[idx].option = selectedValue;
        }
        setCurrentData(updatedData);
        localStorage.setItem('currentQuizData', JSON.stringify(updatedData));
    };

    if (currentData.length === 0) {
        return <Typography>Loading questions...</Typography>;
    }

    async function handleSubmit() {
        const responses = currentData.map(data => ({
            id: data.id,
            response: data.option,
        }));
    
        try {
            let response;
            if(subject==="os")
                response = await calculateScoreForOs(responses);
            else if(subject==="dbms")
                response = await calculateScoreForDbms(responses);
            else if(subject==="cns")
                response = await calculateScoreForCns(responses);
            else
                response = await calculateScoreForOops(responses); 
            const score = response.data;
            localStorage.setItem("score", score);
            localStorage.setItem("totalScore", currentData.length);
            const scoreDetails = {subject : subject2+(topic1!=='MAIN' ? `(${topic1})` : ''), score : score, totalScore : currentData.length};
            await saveScore(scoreDetails);
            navigate(`/finish`);
        } catch (err) {
            console.error("Error while submitting the quiz:", err);
        }
    }
    

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    const optionFilter = (s) => {
        const newStr = s.replace("(Correct)","");
        return newStr;
    }
    const formatTopic = (topic) => {
        return topic
          .split("-")
          .map((part) => part.toUpperCase())
          .join(" ");
      };
    const question = currentData[idx];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    let topic1 = localStorage.getItem("topic");
    topic1 = formatTopic(topic1)
    return (
        <>
            <Container
                maxWidth="false"
                disableGutters
                sx={{ height: '100vh', padding: 0, margin: 0 }}
            >
                <Box
                    sx={{
                        backgroundColor: '#1e1e1e',
                        color: '#ffffff',
                        borderRadius: '0',
                        padding: 4,
                        boxShadow: 'none',
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                    }}
                >
                    <div style={{display : "flex"}}>
                    <Typography
                        variant="h4"
                        sx={{  textAlign: "center", mb: 4, color: '#ffeb3b' }}
                    >
                        Time Left: {minutes}m {seconds}s
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: "#ffeb3b",
                            color: "#000000",
                            '&:hover': {
                                backgroundColor: '#f2d106',
                            },
                            fontWeight: 'bold',
                            padding: '16px 32px',
                            borderRadius: '4px',
                            fontSize: '18px',
                            minWidth: '250px',
                            position: 'absolute',
                            top: 16,
                            right: 16,
                        }}
                    >
                        Finish Test
                    </Button>
                    </div>
                    <Typography
                        variant='h4'
                        sx={{ textAlign : "center", marginBlock : 4,marginTop : "-20px", color : "#ffeb3b"}}
                    >
                        {subject2.toUpperCase()} 
                    </Typography>
                    <Typography variant='h4' sx = {{textAlign : "center", marginBlock : 4,marginTop : "-5px", color : "#ffeb3b"}}
                    >
                        {topic1 !== "MAIN" && `(${topic1.toUpperCase()})`}
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "30px", textAlign: "left", mb: 2, color: '#ffffff',mt : 8 }}
                    >
                        {idx + 1}. {question.description}
                    </Typography>
                    <FormControl component="fieldset" sx={{ width: "100%" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", color: '#ffffff' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOption === "a"}
                                        onChange={handleOptionChange}
                                        value="a"
                                        sx={{ color: '#ffeb3b' }}
                                    />
                                }
                                label={`A. ${optionFilter(question.option_a)}`}
                                sx={{ fontSize: '24px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOption === "b"}
                                        onChange={handleOptionChange}
                                        value="b"
                                        sx={{ color: '#ffeb3b' }}
                                    />
                                }
                                label={`B. ${optionFilter(question.option_b)}`}
                                sx={{ fontSize: '24px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOption === "c"}
                                        onChange={handleOptionChange}
                                        value="c"
                                        sx={{ color: '#ffeb3b' }}
                                    />
                                }
                                label={`C. ${optionFilter(question.option_c)}`}
                                sx={{ fontSize: '24px' }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedOption === "d"}
                                        onChange={handleOptionChange}
                                        value="d"
                                        sx={{ color: '#ffeb3b' }}
                                    />
                                }
                                label={`D. ${optionFilter(question.option_d)}`}
                                sx={{ fontSize: '24px' }}
                            />
                        </Box>
                    </FormControl>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
                        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                            <Button
                                variant="contained"
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
                                onClick={handlePrevious}
                                disabled={idx === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
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
                                onClick={handleNext}
                                disabled={idx === currentData.length - 1}
                            >
                                Next
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
            <Snackbar
    open={openSnackbar}
    autoHideDuration={2000}
    onClose={handleCloseSnackbar}
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    message={snackbarMessage}
    action={
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    }
>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
