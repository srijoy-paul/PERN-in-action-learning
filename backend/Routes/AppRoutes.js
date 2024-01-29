const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/createTodo", async (req, res) => {
    try {
        const { title, descrip } = req.body;
        console.log(title, descrip);
        const newTodo = await pool.query("INSERT INTO todo(title,descrip) VALUES($1,$2) RETURNING *", [title, descrip]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

router.get("/getTodos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
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
        const { title, descrip } = req.body;

        const todo = pool.query("UPDATE todo SET title=$1, descrip=$2 WHERE id=$3", [title, descrip, id]);

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