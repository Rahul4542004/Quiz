import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, Link, Box, Paper } from '@mui/material';

export const Resources = () => {
  const resources = [
    {
      topic: 'DBMS',
      subtopics: [
        { name: 'Introduction to DBMS', url: 'https://www.tutorialspoint.com/dbms/er_model_basic_concepts.htm' },
        { name: 'SQL', url: 'https://www.geeksforgeeks.org/sql-tutorial/' },
        { name: 'Schema Refinement & Normalization', url: 'https://www.javatpoint.com/dbms-normalization' },
        { name: 'Transaction Management', url: 'https://www.geeksforgeeks.org/transaction-management/' },
      ],
    },
    {
      topic: 'OS',
      subtopics: [
        { name: 'Operating System Overview', url: 'https://www.javatpoint.com/what-is-the-process-in-operating-system' },
        { name: 'Deadlock Prevention and Avoidance', url: 'https://www.javatpoint.com/os-deadlocks-introduction' },
        { name: 'Memory Management Strategies', url: 'https://www.geeksforgeeks.org/memory-management-in-operating-system/' },
        { name: 'Protection and Security in OS', url: 'https://www.tutorialspoint.com/protection-and-security-in-operating-system' },
      ],
    },
    {
      topic: 'CNS',
      subtopics: [
        { name: 'Network Models', url: 'https://www.tutorialspoint.com/data_communication_computer_network/computer_network_models.htm' },
        { name: 'Physical & Data Link Layer', url: 'https://www.geeksforgeeks.org/data-link-layer/' },
        { name: 'Network Layer and Routing Algorithms', url: 'https://www.geeksforgeeks.org/network-layer-services-packetizing-routing-and-forwarding/' },
        { name: 'Cryptography & Network Security', url: 'https://www.geeksforgeeks.org/cryptography-and-network-security-principles/' },
      ],
    },
    {
      topic: 'OOP',
      subtopics: [
        { name: 'Classes and Objects', url: 'https://www.geeksforgeeks.org/classes-objects-java/' },
        { name: 'OOP Concepts', url: 'https://www.geeksforgeeks.org/understanding-encapsulation-inheritance-polymorphism-abstraction-in-oops/' },
        { name: 'Standard Keywords', url: 'https://placementkit.in/java-programing-language/super-this-static-final-keywords-in-java/' },
        { name: 'Abstraction & Interfaces', url: 'https://www.javatpoint.com/difference-between-abstract-class-and-interface' },
      ],
    },
  ];

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          marginBottom: 4,
          backgroundColor: '#333333', // Dark gray
          color: '#ffffff', // White text
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Resources
        </Typography>
      </Paper>
      {resources.map((resource, index) => (
        <Box key={index} mb={4}>
          <Paper
            elevation={1}
            sx={{
              padding: 2,
              backgroundColor: '#333333', // Dark gray
              color: '#ffffff', // White text
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              {resource.topic}
            </Typography>
            <List>
              {resource.subtopics.map((subtopic, subIndex) => (
                <ListItem key={subIndex}>
                  <ListItemText
                    primary={
                      <Link href={subtopic.url} target="_blank" rel="noopener noreferrer" sx={{ color: '#ffeb3b' }}>
                        {subtopic.name}
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      ))}
    </Container>
  );
};
