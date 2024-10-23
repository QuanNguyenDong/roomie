const express = require("express");
const currentUser = require("../middlewares/current-user");

const Event = require("../models/event");
const User = require("../models/user");
const JoinHouse = require("../models/joinHouse");

const router = express.Router();

router.post("/events/create", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const { eventname, startDate, endDate } = req.body;

    const event = await Event.create({
        user,
        eventname,
        startDate,
        endDate,
    });

    res.send({ event });
});

router.get("/events/all", currentUser, async (req, res) => {
    try {
        const events = await Event.find().populate('user');
        res.send(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

router.get("/events/all/active", currentUser, async (req, res) => {
    console.log("req", req)
    console.log("req.currentUser", req.currentUser)
    console.log("req.currentUser?.id", req.currentUser?.id)
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const joinHouse = await JoinHouse.findOne({
        user: req.currentUser?.id,
    })

    if (!joinHouse) 
        return res.send({});
    
    const house = joinHouse.house;

    let users = await JoinHouse.find({ house: house }).populate("user");
    users = users.filter((user) => user.user);
    users = users.map((user) => user.user);
    userIds = users.map((user) => user._id);

    var events = await Event.find({ user: { $in: userIds } }).populate("user");
    
    return res.status(200).json(events);
});

router.get("/events/check", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        return res.status(401).send({ message: "Unauthorized" });
    }

    const { eventname, startDate } = req.query;

    try {
        const eventExists = await Event.findOne({
            user: user._id,
            eventname,
            startDate
        });

        if (eventExists) {
            return res.send({ exists: true });
        } else {
            return res.send({ exists: false });
        }
    } catch (error) {
        console.error('Error checking event:', error);
        return res.status(500).send({ message: 'Internal Server Error' });
    }
});

module.exports = router;
