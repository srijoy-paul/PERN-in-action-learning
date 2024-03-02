import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TodoComponent from "./TodoComponent";

function ShowAllTodo() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:5174/api/v1/getTodos", {
        method: "GET",
      });
      const data = await response.json();
      // console.log(data);
      setTodos(data);
    })();
  }, [todos]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // border: "2px solid yellow",
        // height: "100%",
        flex: "1",
        height: "50%",
      }}
    >
      <Box
        sx={{
          // border: "5px solid purple",
          mt: "5px",
        }}
      >
        <Typography variant="h5" component={"h2"}>
          Your Todos :
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          mt: "5px",
          overflowY: "scroll",
          flex: "2",
          //   border: "5px solid blue",
        }}
      >
        {todos.length != 0 ? (
          todos.map((todo, index) => {
            return <TodoComponent key={index} todo={todo} />;
          })
        ) : (
          <Box>No Todos created yet.</Box>
        )}
      </Box>
    </Box>
  );
}

export default ShowAllTodo;
