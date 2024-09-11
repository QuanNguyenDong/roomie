const Question = require("../models/question");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

if (!process.env.MONGO_URI) throw new Error("MONGO_URI must be defined");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/roomies`);
        console.log("Connected to MongoDb");
    } catch (err) {
        console.error(err);
    }
};
connectDB();

const ice_breaker_questions = [
    {
        question:
            "What’s the most interesting thing you’ve read or seen lately?",
    },
    { question: "If you could have any superpower, what would it be and why?" },
    {
        question:
            "What’s a skill you’ve always wanted to learn but haven’t yet?",
    },
    { question: "If you could travel anywhere right now, where would you go?" },
    { question: "What’s your favorite way to relax after a long day?" },
    { question: "What’s the best advice you’ve ever gotten?" },
    {
        question:
            "If you could meet any historical figure, who would it be and why?",
    },
    {
        question:
            "What’s one thing on your bucket list that you really want to do?",
    },
    {
        question:
            "If you could only eat one meal for the rest of your life, what would it be?",
    },
    {
        question:
            "What’s a hobby or interest you love that others might not know about?",
    },
];

const createQuestion = async () => {
    try {
        const question = await Question.create(ice_breaker_questions);
        console.log(question);
    } catch (err) {
        console.error(err);
    }
};
createQuestion();

const deleteAllData = async () => {
    try {
        await Question.deleteMany();
        console.log("All Data successfully deleted");
    } catch (err) {
        console.log(err);
    }
};
// deleteAllData();