const db = require("./db");
const authRoutes = require("./routes/authRoutes");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});