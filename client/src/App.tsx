import { useState } from "react";
import "./App.css";
import CreateTodo from "./Components/CreateTodo";
import { Box } from "@mui/material";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div
        style={{ border: "2px solid blue", width: "100vw", height: "100vh" }}
      >
        <Box sx={{ width: "50%", margin: "0 auto" }}>
          <CreateTodo />
        </Box>
      </div>
    </>
  );
}

export default App;
