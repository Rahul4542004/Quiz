import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateScoreForOs, getCNS, getCNSByTopic, getDBMS, getDBMSByTopic, getOOPS, getOOPSByTopic, getOS, getOSByTopic, saveTest } from '../services/QuizService';
import { FormControl, FormControlLabel, Typography, Checkbox, Button, Box, Container } from '@mui/material';

export const Quiz = () => {
    const { subject, topic } = useParams();
    const [idx, setIdx] = useState(JSON.parse(localStorage.getItem('currentQuizIdx')) || 0);
    const [currentData, setCurrentData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const navigate = useNavigate();

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
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

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

    function handleSubmit(e) {
        e?.preventDefault();
        localStorage.removeItem("test");
        localStorage.removeItem("currentQuizData");
        localStorage.removeItem("currentQuizIdx");
        const responses = currentData.map(data => ({
            id: data.id,
            response: data.option
        }));
        calculateScoreForOs(responses).then(response => {
            const score = response.data;
            navigate(`/finish/${score}/${currentData.length}`);
        });
    }

    const question = currentData[idx];
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <Container
            maxWidth="false"
            disableGutters
            sx={{ height: '100vh', padding: 0, margin: 0 }}
        >
            <Box
                sx={{
                    backgroundColor: '#1e1e1e', // Darker gray background
                    color: '#ffffff', // White text
                    borderRadius: '0', // No border radius for full coverage
                    padding: 4,
                    boxShadow: 'none', // No shadow
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        backgroundColor: "#ffeb3b", // Yellow color for the finish button
                        color: "#000000", // Black text
                        '&:hover': {
                            backgroundColor: '#f2d106', // Darker yellow on hover
                        },
                        fontWeight: 'bold',
                        padding: '16px 32px', // Larger padding for increased size
                        borderRadius: '4px', // Rectangular shape
                        fontSize: '18px', // Larger font size
                        minWidth: '250px', // Minimum width
                        position: 'absolute', // Absolute positioning within the Box
                        top: 16, // Space from the top
                        right: 16, // Space from the right
                    }}
                >
                    Finish Test
                </Button>
                <Typography
                    variant='h3'
                    sx={{ textAlign: "center", marginBottom: 4, color: '#ffeb3b' }} // Gold color for the title
                >
                    {subject.toUpperCase()} {topic !== "null" && `(${topic.toUpperCase()})`}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{ fontSize: "40px", textAlign: "center", mb: 4, color: '#ffeb3b' }} // Increased font size for timer
                >
                    Time Left: {minutes}m {seconds}s
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ fontSize: "30px", textAlign: "left", mb: 2, color: '#ffffff' }} // Increased font size for question text
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
                                    sx={{ color: '#ffeb3b' }} // Yellow color for checkboxes
                                />
                            }
                            label={`A. ${question.option_a}`}
                            sx={{ fontSize: '24px' }} // Increased font size for option labels
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "b"}
                                    onChange={handleOptionChange}
                                    value="b"
                                    sx={{ color: '#ffeb3b' }} // Yellow color for checkboxes
                                />
                            }
                            label={`B. ${question.option_b}`}
                            sx={{ fontSize: '24px' }} // Increased font size for option labels
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "c"}
                                    onChange={handleOptionChange}
                                    value="c"
                                    sx={{ color: '#ffeb3b' }} // Yellow color for checkboxes
                                />
                            }
                            label={`C. ${question.option_c}`}
                            sx={{ fontSize: '24px' }} // Increased font size for option labels
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "d"}
                                    onChange={handleOptionChange}
                                    value="d"
                                    sx={{ color: '#ffeb3b' }} // Yellow color for checkboxes
                                />
                            }
                            label={`D. ${question.option_d}`}
                            sx={{ fontSize: '24px' }} // Increased font size for option labels
                        />
                    </Box>
                </FormControl>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
                    <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ffeb3b", // Yellow color for buttons
                                color: "#000000", // Black text
                                '&:hover': {
                                    backgroundColor: '#f2d106', // Darker yellow on hover
                                },
                                fontWeight: 'bold',
                                padding: '12px 24px',
                                borderRadius: '4px', // Rectangular shape
                                fontSize: '16px', // Larger font size
                                minWidth: '120px', // Minimum width
                            }}
                            onClick={handlePrevious}
                            disabled={idx === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#ffeb3b", // Yellow color for buttons
                                color: "#000000", // Black text
                                '&:hover': {
                                    backgroundColor: '#f2d106', // Darker yellow on hover
                                },
                                fontWeight: 'bold',
                                padding: '12px 24px',
                                borderRadius: '4px', // Rectangular shape
                                fontSize: '16px', // Larger font size
                                minWidth: '120px', // Minimum width
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
    );
};
