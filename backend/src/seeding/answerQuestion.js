const User = require("../models/user");
const Question = require("../models/question");
const answerQuestion = require("../models/answerQuestion");
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

const createAnswer = async (user, question) => {
    try {
        const answer = await answerQuestion.create({
            user,
            question,
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam commodo semper ornare. Proin ac sollicitudin felis. Aliquam feugiat tempus nibh in molestie. Vivamus vitae efficitur urna.",
        });
        console.log(answer.toJSON());
    } catch (err) {
        console.error(err);
    }
};
// createAnswer("66d867c5e5d9e9ea95ee269c", "66d580f2d6f7b9a7de865646");
// createAnswer("66d867c5e5d9e9ea95ee269c", "66d580f2d6f7b9a7de865649");
// createAnswer("66d867c5e5d9e9ea95ee269c", "66d580f2d6f7b9a7de86564a");

const getAnswer = async (user, question) => {
    try {
        const answer = await answerQuestion
            .find({ user, question })
            .populate("user")
            .populate("question")
            .exec();
        console.log(answer);
    } catch (err) {
        console.error(err);
    }
};
// getAnswer("66d51e9ad5ff6606e76ef95f", "66d580f2d6f7b9a7de86564b");

const deleteAllData = async () => {
    try {
        await answerQuestion.deleteMany();
        console.log("All Data successfully deleted");
    } catch (err) {
        console.log(err);
    }
};
// deleteAllData();
