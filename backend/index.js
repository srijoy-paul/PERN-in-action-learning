const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const router = require("./Routes/AppRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/v1", router);


const PORT = 5174;
app.listen(PORT, () => {
    console.log(`server running on port number: ${PORT}`);
})