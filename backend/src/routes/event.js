const express = require("express");
const currentUser = require("../middlewares/current-user");

const Event = require("../models/event");
const User = require("../models/user");

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
