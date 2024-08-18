import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { calculateScoreForOs, getCNS, getCNSByTopic, getDBMS, getDBMSByTopic, getOOPS, getOOPSByTopic, getOS, getOSByTopic, saveTest } from '../services/QuizService';
import { FormControl, FormControlLabel, Typography,Checkbox, Button, Box } from '@mui/material';

export const Quiz = () => {
    const { subject, topic } = useParams();
    const [idx, setIdx] = useState(JSON.parse(localStorage.getItem('currentQuizIdx')) || 0);
    const [currentData, setCurrentData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
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
    function handleSubmit(e){
        e.preventDefault();
        localStorage.removeItem("test");
        localStorage.removeItem("currentQuizData");
        localStorage.removeItem("currentQuizIdx");
        const responses = currentData.map(data => {
            const response = {id : data.id,response : data.option};
            return response;
        })
        let score = 0;
        calculateScoreForOs(responses).then(response => {
                score = response.data;
                navigate(`/finish/${score}/${currentData.length}`);
            }
        )
    }
    const question = currentData[idx];
    return (
        <>
            <Typography variant='h3' sx={{ textAlign: "center" }}>
                {subject.toUpperCase()} {topic !== "null" && `(${topic.toUpperCase()})`}
            </Typography>
            <center>
                <FormControl component="fieldset" sx={{ width: "800px", marginTop: "50px" }}>
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "28px", textAlign: "left", mb: 2 ,color : "black"}}
                    >
                        {idx + 1}. {question.description}
                    </Typography>
                    <Box sx = {{display : "flex", flexDirection : "column",color : "black"}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "a"}
                                    onChange={handleOptionChange}
                                    value="a"
                                />
                            }
                            label={`A. ${question.option_a}`}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "b"}
                                    onChange={handleOptionChange}
                                    value="b"
                                />
                            }
                            label={`B. ${question.option_b}`}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "c"}
                                    onChange={handleOptionChange}
                                    value="c"
                                />
                            }
                            label={`C. ${question.option_c}`}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedOption === "d"}
                                    onChange={handleOptionChange}
                                    value="d"
                                />
                            }
                            label={`D. ${question.option_d}`}
                        />
                    </Box>
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
                    <Button onClick={handleSubmit}>Finish test</Button>
                </FormControl>
            </center>
        </>
    );
};
