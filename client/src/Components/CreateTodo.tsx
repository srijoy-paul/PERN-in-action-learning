import React, { useState } from "react";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { TextareaAutosize } from "@mui/base";

function CreateTodo() {
  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const title = e.target[0].value;
      const descrip = e.target[2].value;

      console.log(title, descrip);
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        crossDomain: true,
        body: JSON.stringify({
          title: title,
          descrip: descrip,
        }),
      };
      // I and Priyanka decided to start and finish the aptitude part of our prep. studies. We have planned to to search the resources to learn or practice the topics from. So we have decided to follow some YouTube channels who teaches the topics or practice questions that were actually asked in the interview of companies.
      const response = await fetch(
        "http://localhost:5174/api/v1/createTodo",
        options
      );
      const data = await response.json();
      console.log("Createtodo", data);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div style={{ padding: "0 0px" }}>
      <form
        onSubmit={handleFormSubmit}
        style={{
          padding: "15px 10px 0 10px",
          display: "flex",
          flexDirection: "column",
          //   border: "4px solid green",
          background: "#9400FF",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={title}
          sx={{
            mb: "12px",
            bgcolor: "#dcf2f1cf",
            color: "#7FC7D9",
            // py: "0",
            // px:"0"
            // active: "outline:2px solid red",
          }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextareaAutosize
          minRows={10}
          placeholder="Description"
          id="createTodoDescrip"
          value={descrip}
          onChange={(e) => {
            setDescrip(e.target.value);
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", py: "12px" }}>
          <Button
            type="submit"
            sx={{ px: "15px", py: "10px", bgcolor: "white", hover: "" }}
            id="createBTN"
            // onClick={handleFormSubmit}
          >
            Create Todo
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default CreateTodo;
