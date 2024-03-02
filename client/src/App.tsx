import { useState } from "react";
import "./App.css";
import CreateTodo from "./Components/CreateTodo";
import { Box } from "@mui/material";
import ShowAllTodo from "./Components/ShowAllTodo";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Box
          sx={{
            width: "50%",
            margin: "0 auto",
            // border: "5px solid steelblue",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CreateTodo />
          <ShowAllTodo />
        </Box>
      </div>
    </>
  );
}

export default App;
