import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import React from "react";

function TodoComponent({ todo }) {
  // console.log(todo);

  async function handleDelete() {
    console.log(todo.id);
    await fetch(`http://localhost:5174/api/v1/deleteTodo/${todo.id}`, {
      method: "DELETE",
    });
    // const returned = await response.json();
    // console.log(returned);
  }

  return (
    <div>
      <Accordion sx={{ bgcolor: "#1F2544" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div
            onClick={() => handleDelete()}
            style={{ display: "flex", padding: "0" }}
          >
            <RemoveCircleIcon />
          </div>
          <Typography sx={{ ml: "5px", color: "#9400FF", fontWeight: "bold" }}>
            {todo.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{todo.descrip}</AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TodoComponent;
