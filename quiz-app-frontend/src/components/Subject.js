import React, { useEffect, useState } from "react";
import { Stack, SnackbarContent, Button } from "@mui/material";
import { useParams } from "react-router-dom";

export const Subject = () => {
  // Define the action for the SnackbarContent
  // const action = (
  //   <Button color="secondary" size="small">
  //     UNDO
  //   </Button>
  // );
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
    }
    else if (subject ===  "cns") {
      setTopic1("Network-Models");
      setTopic2("Physical-&-Data-Link-Layer");
      setTopic3("Network-Layer-and-Routing-Algorithms");
      setTopic4("Cryptography-&-Network-Security");
    }
    else if (subject === "oops") {
      setTopic1("Classes-and-Objects");
      setTopic2("OOP-Concepts");
      setTopic3("Standard-Keywords");
      setTopic4("Abstraction-&-I  nterfaces");
    }
  }, [subject]);
  console.log(topic1);
  const msg1 = topic1.split("-");
  const msg2 = topic2.split("-");
  const msg3 = topic3.split("-");
  const msg4 = topic4.split("-");
  let message1 = "";
  msg1.forEach((msg) => {
    message1 += msg.toUpperCase() + " ";
  });

  let message2 = "";
  msg2.forEach((msg) => {
    message2 += msg.toUpperCase() + " ";
  })

  let message3="";
  msg3.forEach((msg) => {
    message3 += msg.toUpperCase() + " ";
  });

 
  let message4 = "";
  msg4.forEach((msg) => {
    message4 += msg.toUpperCase() + " ";
  });

  return (
    <>
      <div>
        <Stack sx={{ maxWidth: "95%", marginLeft: "30px", marginTop: "40px" }}>
          <SnackbarContent
            message={message1}
            action={<Button>Take Quiz</Button>}
            sx={{ height: "80px" }}
          />
        </Stack>
      </div>

      {/* <p>{subject}</p>
      <p>{topic1}</p>
      <p>{topic2}</p>
      <p>{topic3}</p>
      <p>{topic4}</p> */}

      <div>
        <Stack sx={{ maxWidth: "95%", marginLeft: "30px", marginTop: "40px" }}>
          <SnackbarContent
            message={message2}
            action={<Button>Take Quiz</Button>}
            sx={{ height: "80px" }}
          />
        </Stack>
      </div>

      <div>
        <Stack sx={{ maxWidth: "95%", marginLeft: "30px", marginTop: "40px" }}>
          <SnackbarContent
            message={message3}
            action={<Button>Take Quiz</Button>}
            sx={{ height: "80px" }}
          />
        </Stack>
      </div>

      <div>
        <Stack sx={{ maxWidth: "95%", marginLeft: "30px", marginTop: "40px" }}>
          <SnackbarContent
            message={message4}
            action={<Button>Take Quiz</Button>}
            sx={{ height: "80px" }}
          />
        </Stack>
      </div>

      <div>
        <Stack sx={{ maxWidth: "95%", marginLeft: "30px", marginTop: "40px" }}>
          <SnackbarContent
            message="OVERALL QUIZ"
            action={<Button>Take Quiz</Button>}
            sx={{ height: "80px" }}
          />
        </Stack>
      </div>
    </>
  );
};
