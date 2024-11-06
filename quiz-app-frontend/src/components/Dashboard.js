import React, { useEffect, useState } from 'react';
import { getScores } from '../services/QuizService';
import { Box, Typography, Grid, Paper, useMediaQuery } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, YAxis, Legend, ResponsiveContainer } from 'recharts';
import GaugeChart from 'react-gauge-chart';

// Custom Tooltip Component for Bar Chart
const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, percentage } = payload[0].payload;
        return (
            <Paper style={{ padding: '10px' }}>
                <Typography>{`Subject: ${name}`}</Typography>
                <Typography>{`Percentage: ${percentage.toFixed(2)}%`}</Typography>
            </Paper>
        );
    }
    return null;
};

export const Dashboard = () => {
    const [scores, setScores] = useState([]);
    const isMobile = useMediaQuery('(max-width:600px)'); // Check if screen width is below 600px

    const fetchScores = async () => {
        try {
            const result = await getScores();
            setScores(result);
        } catch (error) {
            console.error("Error fetching scores:", error);
        }
    };

    useEffect(() => {
        fetchScores(); 
    }, []);

    // Prepare data for charts with dates on x-axis
    const barData = scores.map((score) => ({
        name: score.subject,
        score: score.score,
        totalScore: score.totalScore,
        percentage: (score.score / score.totalScore) * 100,
    }));

    const latestScore = barData[barData.length - 1]?.percentage || 0;
    const pieData = [
        { name: 'Excellent', value: barData.filter(s => s.percentage >= 90).length },
        { name: 'Good', value: barData.filter(s => s.percentage >= 80 && s.percentage < 90).length },
        { name: 'Average', value: barData.filter(s => s.percentage >= 60 && s.percentage < 80).length },
        { name: 'Below Average', value: barData.filter(s => s.percentage >= 40 && s.percentage < 60).length },
        { name: 'Bad', value: barData.filter(s => s.percentage < 40).length }
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000'];

    // Prepare data for heat map
    const heatMapData = barData.reduce((acc, score) => {
        const subjectIndex = acc.findIndex(item => item.subject === score.name);
        if (subjectIndex === -1) {
            acc.push({ subject: score.name, scores: [{ percentage: score.percentage }] });
        } else {
            acc[subjectIndex].scores.push({ percentage: score.percentage });
        }
        return acc;
    }, []);

    const chartHeight = isMobile ? 200 : 300; // Set a fixed height for both charts

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                User Performance Dashboard
            </Typography>

            <Grid container spacing={4} justifyContent="center">

                {/* Bar Chart */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" align="center">Scores by Percentage</Typography>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <BarChart data={barData}>
                                <YAxis label={{ value: "Percentage (%)", angle: -90, position: "insideLeft" }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="percentage" fill="#8884d8" name="Percentage (%)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Pie Chart */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" align="center">Performance Breakdown</Typography>
                        <ResponsiveContainer width="100%" height={chartHeight}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={isMobile ? 60 : 80}
                                    fill="#8884d8"
                                    label={!isMobile} // Hide labels on mobile for better space
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Gauge Chart */}
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" align="center">Latest Score Gauge</Typography>
                        <GaugeChart 
                            id="gauge-chart"
                            nrOfLevels={5}
                            colors={['#FF0000', '#FF8042', '#FFBB28', '#00C49F', '#0088FE']}
                            arcWidth={0.3}
                            percent={latestScore / 100}
                            textColor="#000000"
                            formatTextValue={(value) => `${value}%`}
                            style={{ height: chartHeight }} // Set the same height as pie chart
                        />
                    </Paper>
                </Grid>

                {/* Heat Map */}
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" align="center">Heat Map of Scores</Typography>
                        <Box display="grid" gridTemplateColumns={`repeat(auto-fit, minmax(${isMobile ? '80px' : '100px'}, 1fr))`} gap={1}>
                            {heatMapData.map((subjectData, subjectIndex) => (
                                <Box key={subjectIndex} display="flex" flexDirection="column">
                                    <Typography align="center" variant="subtitle2">{subjectData.subject}</Typography>
                                    {subjectData.scores.map((scoreData, scoreIndex) => (
                                        <Box
                                            key={scoreIndex}
                                            sx={{
                                                height: '40px',
                                                backgroundColor: `rgba(255, 0, 0, ${scoreData.percentage / 100})`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: isMobile ? '0.8rem' : '1rem'
                                            }}
                                        >
                                            {scoreData.percentage.toFixed(2)}%
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                </Grid>

            </Grid>
        </Box>
    );
};
