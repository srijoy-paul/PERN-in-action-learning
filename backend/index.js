const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const scheduler = require("node-cron");
const router = require("./Routes/AppRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1", router);

scheduler.schedule(`5 0 * * *`, async () => {
    const completedTodos = await pool.query("SELECT * FROM todo WHERE checked=true ORDER BY id ASC");
    // console.log(completedTodos);
    completedTodos.rows.map(async (todo) => {
        console.log("Deleting", todo.id);
        await pool.query("DELETE FROM todo WHERE id=$1", [todo.id])
    })
});

// (async () => {
//     const completedTodos = await pool.query("SELECT * FROM todo WHERE checked=true");
//     console.log(completedTodos);
// })();


const PORT = 5174;
app.listen(PORT, () => {
    console.log(`server running on port number: ${PORT}`);
})