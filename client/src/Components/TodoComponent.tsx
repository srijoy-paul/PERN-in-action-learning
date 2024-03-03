import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

function TodoComponent({ todo }) {
  // console.log(todo);
  const [isEditable, setIsEditable] = useState(false);

  async function handleDelete() {
    console.log(todo.id);
    await fetch(`http://localhost:5174/api/v1/deleteTodo/${todo.id}`, {
      method: "DELETE",
    });
    // const returned = await response.json();
    // console.log(returned);
  }
  function handleChange(e) {
    console.log(e.target.checked);
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      crossDomain: true,
      body: JSON.stringify({
        title: todo.title,
        descrip: todo.descrip,
        checked: e.target.checked,
        edited: false,
      }),
    };
    fetch(`http://localhost:5174/api/v1/updateTodo/${todo.id}`, options);
  }

  function handleEdit() {
    document.getElementById(`description${todo.id}`);
    setIsEditable(true);
  }
  function handleSave() {
    setIsEditable(false);
    console.log(document.getElementById(`description${todo.id}`)?.textContent);
    const newDescrip = document.getElementById(
      `description${todo.id}`
    )?.textContent;
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      crossDomain: true,
      body: JSON.stringify({
        title: todo.title,
        descrip: newDescrip,
        checked: false,
        edited: true,
      }),
    };
    fetch(`http://localhost:5174/api/v1/updateTodo/${todo.id}`, options);
  }
  return (
    <div>
      <Accordion sx={{ bgcolor: "#1F2544" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={
            {
              // border: "3px solid red"
            }
          }
        >
          {/* <div style={{ display: "flex" }}> */}
          <div
            onClick={() => handleDelete()}
            style={{
              display: "flex",
              // border: "2px solid green",
              padding: "0",
            }}
          >
            <RemoveCircleIcon />
          </div>
          {/* </div> */}
          <Typography sx={{ ml: "5px", color: "#9400FF", fontWeight: "bold" }}>
            {todo.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div
            style={{
              display: "flex",
              // border: "2px solid green",
              padding: "0",
              margin: "0",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked={todo.checked}
                  size="small"
                  onChange={(e) => handleChange(e)}
                />
              }
              label="Mark as Done!"
            />
            <div style={{ display: "flex", gap: "15px" }}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleEdit();
                }}
              >
                <EditIcon />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleSave();
                }}
              >
                <SaveIcon />
              </div>
            </div>
          </div>
          <div contentEditable={isEditable} id={`description${todo.id}`}>
            {todo.descrip}
          </div>
          <div>
            {(() => {
              if (todo.edited) {
                return (
                  <div style={{ display: "flex", justifyContent: "end" }}>
                    <span>
                      <Typography variant="body3" component="h6">
                        Edited
                      </Typography>
                    </span>
                  </div>
                );
              }
            })()}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default TodoComponent;
