import React, { useEffect, useState } from 'react';
import { getScores } from '../services/QuizService';

export const Dashboard = () => {
    const [scores, setScores] = useState([]);

    const fetchScores = async () => {
        try {
            const result = await getScores();
            console.log(result);
            setScores(result);
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
    };

    useEffect(() => {
        fetchScores(); 
    }, []); 

    return (
        <div>
            <center>
                <table 
                    style={{
                        color: "black",
                        border: "solid 2px black",
                        width: "500px",
                        marginTop: "50px",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid black", padding: "10px" }}>Subject</th>
                            <th style={{ border: "1px solid black", padding: "10px" }}>Score</th>
                            <th style={{ border: "1px solid black", padding: "10px" }}>Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.slice().reverse().map((obj, index) => { // Reverse the scores array
                            const subject = obj.subject;
                            const score = obj.score;
                            const totalScore = obj.totalScore;
                            const percentage = (score / totalScore) * 100;
                            let performance = '';

                            if (percentage >= 90) {
                                performance = "excellent";
                            } else if (percentage >= 80) {
                                performance = "good";
                            } else if (percentage >= 60) {
                                performance = "average";
                            } else if (percentage >= 40) {
                                performance = "below average";
                            } else {
                                performance = "bad";
                            }

                            return (
                                <tr key={index}>
                                    <td style={{border: "1px solid black", padding: "10px", textAlign: "center" }}>{subject}</td>
                                    <td style={{border: "1px solid black", padding: "10px", textAlign: "center" }}>{score}/{totalScore}</td>
                                    <td style={{border: "1px solid black", padding: "10px", textAlign: "center"}}>{performance}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </center>
        </div>
    );
};
