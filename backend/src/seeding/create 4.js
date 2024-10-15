const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const User = require("../models/user");
const Question = require("../models/question");
const answerQuestion = require("../models/answerQuestion");

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

const users = [
    {
        username: "quan",
        password: "password",
        fullname: "Dong Quan",
        email: "quan@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "daniel",
        password: "password",
        fullname: "Daniel Abd",
        email: "daniel@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "sarah",
        password: "password",
        fullname: "Sarah Sind",
        email: "sarah@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "angus",
        password: "password",
        fullname: "Angus",
        email: "angus@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "sumaiya",
        password: "password",
        fullname: "Sumaiya",
        email: "sumaiya@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "trish",
        password: "password",
        fullname: "Trish",
        email: "trish@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
];

const createUser = async () => {
    try {
        for (const user of users) {
            const count = await User.countDocuments({ username: user.username });
            if (count > 0) continue;
            await User.create(users);
        }
        console.log("User created");
    } catch (err) {
        console.error(err);
    }
};

const createAnswer = async () => {
    try {
        const usernames = users.map((user) => user.username);
        let existUsers = await User.find({ username: { $in: usernames } });
        existUserIds = existUsers.map((user) => user._id);
        let questions = await Question.find({}).limit(3);
        questionIds = questions.map((question) => question._id);

        for (const userId of existUserIds) {
            var answer = await answerQuestion.countDocuments({ user: userId });
            if (answer > 0) continue;

            for (const questionId of questionIds) {
                answer = await answerQuestion.create({
                    user: userId,
                    question: questionId,
                    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                });
            }
        }
        console.log("Answer created");
    } catch (err) {
        console.error(err);
    }
};

const deleteAllData = async (Model) => {
    try {
        await Model.deleteMany();
        console.log(`Data deleted`);
    } catch (err) {
        console.log(err);
    }
};

const start = async () => {
    // await createUser();
    // await createAnswer();
};

start();
