import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";

export const Subject = () => {
  const { subject } = useParams();
  let [topic1, setTopic1] = useState("");
  let [topic2, setTopic2] = useState("");
  let [topic3, setTopic3] = useState("");
  let [topic4, setTopic4] = useState("");

  useEffect(() => {
    if (subject === "os") {
      setTopic1("os-basics");
      setTopic2("deadlock-prevention");
      setTopic3("memory-management");
      setTopic4("protection-security");
    } else if (subject === "dbms") {
      setTopic1("Introduction-to-DBMS");
      setTopic2("SQL");
      setTopic3("Schema-Refinement-&-Normalization");
      setTopic4("Transcation-Management");
    } else if (subject === "cns") {
      setTopic1("Network-Models");
      setTopic2("Physical-&-Data-Link-Layer");
      setTopic3("Network-Layer-and-Routing-Algorithms");
      setTopic4("Cryptography-&-Network-Security");
    } else if (subject === "oops") {
      setTopic1("Classes-and-Objects");
      setTopic2("OOP-Concepts");
      setTopic3("Standard-Keywords");
      setTopic4("Abstraction-&-Interfaces");
    }
  }, [subject]);

  const formatTopic = (topic) => {
    return topic
      .split("-")
      .map((part) => part.toUpperCase())
      .join(" ");
  };

  const messages = [topic1, topic2, topic3, topic4].map(formatTopic);

  return (
    <div className="grid-container" style={{ background: "linear-gradient(111.4deg, rgb(2, 255, 4) 18.4%, rgb(0, 232, 237) 100.2%)" }}>
      <div className="grid-item top-left">
        <Paper
          elevation={14}
          sx={{
            padding: "25px",
            textAlign: "center",
            backgroundColor: "black",
            marginLeft: "35px",
            marginTop: "30px",
            marginBottom: "50px",
            height: "250px",
            width: "270px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(110.4deg, rgb(247, 112, 15) 6.4%, rgb(248, 50, 88) 100.2%)",
          }}
        >
          <h1 style={{ color: "white" }}>{messages[0]}</h1>
          {/* {messages[0]} */}
        </Paper>
      </div>

      <div className="grid-item bottom-left">
        <Paper
          elevation={14}
          sx={{
            padding: "25px",
            paddingright: "10px",
            textAlign: "center",
            backgroundColor: "black",
            marginLeft: "35px",
            marginTop: "10px",
            marginBottom: "50px",
            height: "250px",
            width: "270px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(110.4deg, rgb(247, 112, 15) 6.4%, rgb(248, 50, 88) 100.2%)",
          }}
        >
          <h1 style={{ color: "white", textAlign: "center" }}>{messages[1]}</h1>
        </Paper>
      </div>
    
      <div className="grid-item center">
    
        <Paper
          elevation={14}
          sx={{
            padding: "20px",
            textAlign: "center",
            backgroundColor: "black",
            height: "300px", // Span both rows
            width: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "250px",
          }}
        >
          <h1 style={{ color: "white", textAlign: "center" }}>OVERALL QUIZ</h1>
          {/* {messages[2]} */}
        </Paper>
      </div>

      <div className="grid-item top-right">
        <Paper
          elevation={14}
          sx={{
            padding: "25px",
            textAlign: "center",
            backgroundColor: "black",
            marginRight: "35px",
            marginTop: "10px",
            height: "250px",
            width: "270px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(110.4deg, rgb(247, 112, 15) 6.4%, rgb(248, 50, 88) 100.2%)",
          }}
        >
          <h1 style={{ color: "white" }}> {messages[2]}</h1>
          {/* {messages[3]} */}
        </Paper>
      </div>

      <div className="grid-item bottom-right">
        <Paper
          elevation={14}
          sx={{
            padding: "25px",
            textAlign: "center",
            backgroundColor: "black",
            marginRight: "35px",
            marginTop: "10px",
            marginBottom: "50px",
            height: "250px",
            width: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(110.4deg, rgb(247, 112, 15) 6.4%, rgb(248, 50, 88) 100.2%)",
          }}
        >
          <h1 style={{ color: "white" }}>{messages[3]}</h1>
          {/* {messages[4]} */}
        </Paper>
      </div>
    </div>
  );
};
