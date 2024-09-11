const User = require("../models/user");
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

const users = [
    {
        username: "quan",
        password: "password",
        fullname: "DQ",
        email: "quan@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "daniel",
        password: "password",
        fullname: "DA",
        email: "daniel@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "sarah",
        password: "password",
        fullname: "SS",
        email: "sarah@gmail.com",
        desc: "Sed imperdiet est eget justo venenatis tincidunt. Proin bibendum condimentum nunc quis suscipit. Praesent elit sem, interdum et accumsan sed, pharetra a est. Aenean vehicula cursus mauris. Mauris ut leo sapien. Mauris aliquam volutpat purus quis convallis. Sed vestibulum, dolor in molestie blandit, neque sapien tincidunt mauris, at blandit sem urna eu elit. Nunc nibh sapien, bibendum id enim eget, tincidunt malesuada nisl.",
    },
    {
        username: "angus",
        password: "password",
        fullname: "Angus",
    },
    {
        username: "sumaiya",
        password: "password",
        fullname: "Sumaiya",
    },
    {
        username: "trish",
        password: "password",
        fullname: "Trish",
    },
];

const createUser = async () => {
    try {
        const user = await User.create(users);
        console.log(user);
    } catch (err) {
        console.error(err);
    }
};

const deleteAllData = async () => {
    try {
        await User.deleteMany();
        console.log("All Data successfully deleted");
    } catch (err) {
        console.log(err);
    }
};

const start = async () => {
    // await deleteAllData();
    // await createUser();
};

start();
