const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieSession = require("cookie-session");
const path = require('path');

const authRouter = require("./routes/auth");
const currentUserRouter = require("./routes/profile");
const homeRouter = require("./routes/home");
const taskRouter = require("./routes/task-management");
const questionRouter = require("./routes/question");
const eventRouter = require("./routes/event");
const reviewRouter = require("./routes/review");

if (!process.env.MONGO_URI) throw Error("MONGO_URI must be defined");
if (!process.env.JWT_KEY) throw Error("JWT_KEY must be defined");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/roomies`);
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }
};
connectDB();

const app = express();
const port = 3001;

app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);

app.use(express.json());

app.use("/api", authRouter);
app.use("/api", currentUserRouter);
app.use("/api", homeRouter);
app.use("/api", taskRouter);
app.use("/api", questionRouter);
app.use("/api", eventRouter);
app.use("/api", reviewRouter);
app.use(express.static(path.join(__dirname, "build")));

app.use("/api", (req, res) => {
    res.send("Hello world");
});

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
