import React from "react";
import "./Main.css";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
export function Test() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="section section1">
        <Card
          sx={{ maxWidth: 600, marginLeft: "100px", marginTop: "20px" }}
          onClick={() => navigate(`/test/${"os"}`)}
        >
          <CardMedia
            sx={{ height: 240 }}
            image="os1.jpg"
            title="green iguana"
          />
          <CardContent sx={{ backgroundColor: "black", color: "white" }}>
            <Typography gutterBottom variant="h5" component="div">
              OPERATING SYSTEM
            </Typography>
            <Typography variant="body2" color="white">
              It is a system software that manages computer hardware and
              software resources.
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="section section2">
        <Card
          sx={{ maxWidth: 500, marginLeft: "100px", marginTop: "20px" }}
          onClick={() => navigate(`/test/${"dbms"}`)}
        >
          <CardMedia sx={{ height: 250 }} image="dbms.jpg" />
          <CardContent sx={{ backgroundColor: "black", color: "white" }}>
            <Typography gutterBottom variant="h5" component="div">
              DATABASE MANAGEMENT SYSTEM
            </Typography>
            <Typography variant="body2" color="white">
              It is a systematic way to create, manage and interact with
              databases.
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="section section3">
        <Card
          sx={{
            maxWidth: 600,
            marginLeft: "100px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
          onClick={() => navigate(`/test/${"cns"}`)}
        >
          <CardMedia
            sx={{ height: 200 }}
            image="cns1.jpg"
            title="green iguana"
          />
          <CardContent sx={{ backgroundColor: "black", color: "white" }}>
            <Typography gutterBottom variant="h5" component="div">
              COMPUTER NETWORKS
            </Typography>
            <Typography variant="body2" color="white">
              It is a system of interconnected networks that communicate and
              share resources, data and applications.
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="section section4">
        <Card
          sx={{
            maxWidth: 500,
            marginLeft: "100px",
            marginTop: "20px",
            marginBottom: "10px",
          }}
          onClick={() => navigate(`/test/${"oops"}`)}
        >
          <CardMedia
            sx={{ height: "200px" }}
            image="oop.jpg"
            title="green iguana"
          />
          <CardContent sx={{ backgroundColor: "black", color: "white" }}>
            <Typography gutterBottom variant="h5" component="div">
              OBJECT ORIENTED PROGRAMMING
            </Typography>
            <Typography variant="body2" color="white">
              It contains principles like Encapsulation , Inheritance ,
              Polymorphism , Abstraction.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
