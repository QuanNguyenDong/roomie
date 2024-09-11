const User = require("../models/user");
const House = require("../models/house");
const JoinHouse = require("../models/joinHouse");
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

const createHome = async () => {
    try {
        const home = await House.create({
            name: "Home Slice",
        });
        console.log(home.toJSON());
    } catch (err) {
        console.error(err);
    }
};
// createHome();

const joinHome = async () => {
    try {
        const home = await JoinHouse.create([
            {
                user: "66d867c5e5d9e9ea95ee269b",
                house: "66d5a725fafe5e978f84e2d2",
            },
            {
                user: "66d867c5e5d9e9ea95ee269d",
                house: "66d5a725fafe5e978f84e2d2",
            },
            {
                user: "66d867c5e5d9e9ea95ee269e",
                house: "66d5a725fafe5e978f84e2d2",
            },
            {
                user: "66d867c5e5d9e9ea95ee269f",
                house: "66d5a725fafe5e978f84e2d2",
            },
            {
                user: "66d867c5e5d9e9ea95ee26a0",
                house: "66d5a725fafe5e978f84e2d2",
            },
            {
                user: "66d867c5e5d9e9ea95ee269c",
                house: "66d5a725fafe5e978f84e2d2",
            }
        ]);
        console.log(home);
    } catch (err) {
        console.error(err);
    }
};

const getHome = async (id) => {
    try {
        const homes = await JoinHouse.find({ house: id })
            .populate("user")
            .populate("house")
            .exec();
        console.log({
            house: homes[0].house,
            users: homes.map((home) => home.user),
        });
    } catch (err) {
        console.error(err);
    }
};
// getHome("66d5a725fafe5e978f84e2d2");

const deleteAllData = async () => {
    try {
        await JoinHouse.deleteMany();
        console.log("All Data successfully deleted");
    } catch (err) {
        console.log(err);
    }
};

const start = async () => {
    // await deleteAllData();
    // await joinHome();
};

start();