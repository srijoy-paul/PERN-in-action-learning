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
})

module.exports = router;