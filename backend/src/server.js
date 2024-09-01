const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const app = express();
const port = 3001;

if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }
};
connectDB();

app.use("/", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
