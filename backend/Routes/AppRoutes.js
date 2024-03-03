const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/createTodo", async (req, res) => {
    try {
        const { title, descrip, checked, edited } = req.body;
        console.log(title, descrip, checked, edited);
        const newTodo = await pool.query("INSERT INTO todo(title,descrip,checked,edited) VALUES($1,$2,$3,$4) RETURNING *", [title, descrip, checked, edited]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getTodos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo ORDER BY id ASC");
        // console.log(allTodos.rows);
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
});

router.get("/getTodo/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        const { id } = req.params;
        console.log(id);
        const selectedTodo = await pool.query("SELECT * FROM todo WHERE id=$1", [id]);
        console.log(selectedTodo);
        res.json(selectedTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

router.put("/updateTodo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, descrip, checked, edited } = req.body;

        const todo = pool.query("UPDATE todo SET title=$1, descrip=$2, checked=$3, edited=$4 WHERE id=$5", [title, descrip, checked, edited, id]);

        res.send(`${id} todo is updated`);
    } catch (error) {
        console.error(error.message);
    }
})

router.delete("/deleteTodo/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTodo = await pool.query("DELETE FROM todo WHERE id=$1", [id]);

        res.send(`${id} Todo deleted.`);
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;