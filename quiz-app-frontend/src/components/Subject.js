import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

export const Subject = () => {
  const { subject } = useParams();
  const [topics, setTopics] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const topicMapping = {
      os: [
        "os-basics",
        "deadlock-prevention",
        "memory-management",
        "protection-security",
        "Complete Quiz"
      ],
      dbms: [
        "Introduction-to-DBMS",
        "SQL",
        "Schema-Refinement-&-Normalization",
        "Transaction-Management",
        "Complete Quiz"
      ],
      cns: [
        "Network-Models",
        "Physical-&-Data-Link-Layer",
        "Network-Layer-and-Routing-Algorithms",
        "Cryptography-&-Network-Security",
        "Complete Quiz"
      ],
      oops: [
        "Classes-and-Objects",
        "OOP-Concepts",
        "Standard-Keywords",
        "Abstraction-&-Interfaces",
        "Complete Quiz"
      ]
    };
  
    const descriptionMapping = {
      os: [
        "OS Basics: Explore the core components of an operating system, its functions, and how it manages hardware and software resources. Learn about process management, scheduling, and how the OS provides a platform for application execution. Understand the difference between various types of operating systems like batch, real-time, distributed, and multi-user OSs.",
        "Deadlock Prevention: Delve into the conditions that lead to deadlocks in computing environments. Understand different strategies for preventing, avoiding, and detecting deadlocks. Study resource allocation graphs, and techniques like process scheduling and resource preemption to manage deadlocks effectively.",
        "Memory Management: Discover how operating systems manage memory through techniques like paging, segmentation, and swapping. Learn about the virtual memory concept, how memory is allocated and deallocated, and strategies to avoid memory leaks and fragmentation.",
        "Protection & Security: Focus on the mechanisms employed by operating systems to protect user data and system resources from unauthorized access. Learn about encryption, authentication, access control mechanisms, and how the OS ensures data integrity and user privacy.",
        "Complete Quiz: Test your understanding of all the topics covered under Operating Systems through a comprehensive quiz. This will help reinforce the concepts you've learned and assess your knowledge on OS basics, deadlock prevention, memory management, and protection & security."
      ],
      dbms: [
        "Introduction to DBMS: Understand the basics of Database Management Systems, including the different types of databases (relational, NoSQL, hierarchical, etc.). Learn how DBMSs manage large sets of structured data and enable efficient retrieval and manipulation of data through queries.",
        "SQL: Structured Query Language (SQL) is the standard language used to communicate with databases. Learn to write queries to create, read, update, and delete (CRUD) data from relational databases. Explore advanced topics like joins, nested queries, indexes, and query optimization.",
        "Schema Refinement & Normalization: Discover the importance of designing efficient database schemas. Learn about normalization and its various forms (1NF, 2NF, 3NF, BCNF) to reduce redundancy and eliminate anomalies in relational databases. Understand the trade-offs between normalization and performance.",
        "Transaction Management: Study how transactions are managed in a DBMS to ensure ACID (Atomicity, Consistency, Isolation, Durability) properties. Learn about transaction logs, commit protocols, concurrency control, and how databases recover from failures to maintain data integrity.",
        "Complete Quiz: Test your understanding of all the topics covered under DBMS through a final quiz, reviewing concepts such as SQL, schema refinement, normalization, and transaction management."
      ],
      cns: [
        "Network Models: Explore different network models, including the OSI and TCP/IP models. Learn how each layer in these models functions to facilitate communication across networks, from the physical transmission of bits to the application-level communication protocols like HTTP and FTP.",
        "Physical & Data Link Layer: Understand how data is transmitted over the network at the physical layer, including concepts like signal modulation and transmission media. At the Data Link Layer, explore protocols like Ethernet, MAC addressing, and error detection and correction techniques.",
        "Network Layer & Routing Algorithms: Study how data is routed across different networks using routing algorithms like Dijkstra, Bellman-Ford, and AODV. Learn about IP addressing, subnetting, and the role of routers in ensuring data reaches its destination through the most efficient path.",
        "Cryptography & Network Security: Dive into the world of cryptography, including symmetric and asymmetric encryption methods, digital signatures, and certificates. Learn how to protect data from eavesdropping, tampering, and unauthorized access. Explore common security threats like DDoS attacks and phishing.",
        "Complete Quiz: Test your understanding of Computer Networks concepts with a final quiz covering topics such as network models, layers, routing algorithms, and cryptography."
      ],
      oops: [
        "Classes and Objects: In object-oriented programming, everything revolves around the concept of classes and objects. Learn how classes serve as blueprints for objects, encapsulating attributes and behaviors. Explore how objects are instances of classes and how they interact with each other in complex systems.",
        "OOP Concepts: Dive deep into the four fundamental principles of OOP—encapsulation, abstraction, inheritance, and polymorphism. Understand how these concepts are used to create modular, reusable, and scalable code, and how they differ from procedural programming approaches.",
        "Standard Keywords: Familiarize yourself with common OOP keywords such as 'this', 'super', 'extends', 'implements', and 'new'. Learn how these keywords are used to manage object creation, inheritance, method overriding, and polymorphism in various programming languages.",
        "Abstraction & Interfaces: Understand the concept of abstraction, where complex systems are simplified by exposing only relevant data. Learn about interfaces and abstract classes and how they allow for the implementation of multiple inheritance in object-oriented languages.",
        "Complete Quiz: Review and test your knowledge of OOP principles, classes, objects, abstraction, and interfaces through a final comprehensive quiz."
      ]
    };
  
    setTopics(topicMapping[subject] || []);
    setDescriptions(descriptionMapping[subject] || []);
  }, [subject]);
  

  const formatTopic = (topic) => {
    return topic
      .split("-")
      .map((part) => part.toUpperCase())
      .join(" ");
  };

  const messages = topics.map(formatTopic);

  return (
    <div>
      <Box sx={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5', padding: '50px', borderRadius: '8px' }}>
        <Grid container spacing={2} justifyContent="center">
          {messages.map((topic, index) => (
            <Grid item xs={12} md={8} key={index}> 
              <Card sx={{ width: '100%', height: '180px', marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h5">{topic}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px", width: "90%" }}>
                    {descriptions[index]}
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (topics[index] !== "Complete Quiz") {
                          navigate(`/test/instructions/${subject}/${topics[index]}`);
                        } else {
                          navigate(`/test/instructions/${subject}/main`);
                        }
                      }}
                    >
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};
