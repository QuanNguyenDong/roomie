const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cookieSession = require("cookie-session");
const cors = require("cors");

const authRouter = require("./routes/auth");
const currentUserRouter = require("./routes/profile");
const homeRouter = require("./routes/home");
const taskRouter = require("./routes/task-management");
const userRouter = require("./routes/user");

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
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());

app.use(authRouter);
app.use(currentUserRouter);
app.use(homeRouter);
app.use(taskRouter);
app.use(userRouter);

app.use("/api", (req, res) => {
    res.send("Hello world");
});

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
