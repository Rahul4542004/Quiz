import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCNS, getCNSByTopic, getDBMS, getDBMSByTopic, getOOPS, getOOPSByTopic, getOS, getOSByTopic, getTest, isTakingTest, saveTest } from '../services/QuizService';
import { FormControl, FormControlLabel, RadioGroup, Typography, Radio, Button, Box } from '@mui/material';

export const Quiz = () => {
    const { subject, topic } = useParams();
    const [idx, setIdx] = useState(JSON.parse(localStorage.getItem('currentQuizIdx')) || 0);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const storedData = JSON.parse(localStorage.getItem('currentQuizData'));
            const storedIdx = JSON.parse(localStorage.getItem('currentQuizIdx'));
            
            if (storedData && storedIdx !== null && storedData.length > 0) {
                setCurrentData(storedData);
                setIdx(storedIdx);
            } else {
                try {
                    let response;
                    if (subject === 'os') {
                        response = topic === "null" ? await getOS() : await getOSByTopic(topic);
                    } else if (subject === 'cns') {
                        response = topic === "null" ? await getCNS() : await getCNSByTopic(topic);
                    } else if (subject === 'dbms') {
                        response = topic === "null" ? await getDBMS() : await getDBMSByTopic(topic);
                    } else if (subject === 'oops') {
                        response = topic === "null" ? await getOOPS() : await getOOPSByTopic(topic);
                    }

                    const data = response.data;
                    saveTest(data);
                    setCurrentData(data);
                    localStorage.setItem('currentQuizData', JSON.stringify(data));
                    localStorage.setItem('currentQuizIdx', JSON.stringify(0));
                    setIdx(0);
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

    if (currentData.length === 0) {
        return <Typography>Loading questions...</Typography>;
    }

    const question = currentData[idx];
    return (
        <>
            <Typography variant='h3' sx={{ textAlign: "center" }}>
                {subject.toUpperCase()} {topic!=="null" && `(${topic.toUpperCase()})`}
            </Typography>
            <center>
                <FormControl component="fieldset" sx={{ width: "800px", marginTop: "50px" }}>
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "28px", textAlign: "left", mb: 2 }}
                    >
                        {idx + 1}. {question.description}
                    </Typography>
                    <RadioGroup
                        aria-label="quiz-options"
                        name="quiz-options"
                        sx={{ fontSize: "20px" }}
                    >
                        <FormControlLabel value="a" control={<Radio />} label={`A. ${question.option_a}`} />
                        <FormControlLabel value="b" control={<Radio />} label={`B. ${question.option_b}`} />
                        <FormControlLabel value="c" control={<Radio />} label={`C. ${question.option_c}`} />
                        <FormControlLabel value="d" control={<Radio />} label={`D. ${question.option_d}`} />
                    </RadioGroup>
                    <Box mt={2} sx={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "black", color: "white", '&:hover': { backgroundColor: 'rgb(0,0,0,0.7)', boxShadow: 'none' }, }}
                            onClick={handlePrevious}
                            disabled={idx === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "black", color: "white", '&:hover': { backgroundColor: 'rgb(0,0,0,0.7)', boxShadow: 'none' }, }}
                            onClick={handleNext}
                            disabled={idx === currentData.length - 1}
                        >
                            Next
                        </Button>
                    </Box>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        localStorage.removeItem("test");
                        localStorage.removeItem("currentQuizData");
                        localStorage.removeItem("currentQuizIdx");
                        setCurrentData([]);
                    }}>Finish test</Button>
                </FormControl>
            </center>
        </>
    );
};
