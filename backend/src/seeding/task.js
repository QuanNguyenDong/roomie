const Task = require("../models/task");
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

const tasks =
[
    {
        taskname: "Clean the kitchen",
        description: "Clean the kitchen",
        frequency : 7,
        duration: 30,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Clean the bathroom",
        description: "Clean the bathroom",
        frequency : 7,
        duration: 30,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Clean the living room",
        description: "Clean the living room",
        frequency : 7,
        duration: 30,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Walk dog",
        description: "Walk dog",
        frequency : 1,
        duration: 60,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Water plants",
        description: "Water plants",
        frequency : 7,
        duration: 10,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Take out rubbish",
        description: "Take out rubbish",
        frequency : 3,
        duration: 5,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Clean pool",
        description: "Clean pool",
        frequency : 7,
        duration: 30,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Clean the dishes",
        description: "Clean the dishes",
        frequency : 1,
        duration: 20,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Mow grass",
        description: "Mow grass",
        frequency : 7,
        duration: 45,
        house: "66d5a725fafe5e978f84e2d2",
    },
    {
        taskname: "Weeding",
        description: "Weeding",
        frequency : 7,
        duration: 45,
        house: "66d5a725fafe5e978f84e2d2",
    }
];

const createTask = async () => {
    try {
        const task = await Task.create(tasks);
        console.log(task);
    } catch (err) {
        console.error(err);
    }
};

const start = async () => {
    await createTask();
};

start();
