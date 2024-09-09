const express = require("express");
const currentUser = require("../middlewares/current-user");

const Task = require("../models/task");
const User = require("../models/user");
const JoinHouse = require("../models/joinHouse");
const AssignTask = require("../models/assignTask");


const router = express.Router();

router.post("/tasks/create", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const { title, description, frequency, time, priority } = req.body;

    const joinHouse = await JoinHouse.findOne({ user: req.currentUser?.id });
    if (!joinHouse) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const task = await Task.create({
        title,
        description,
        frequency,
        time,
        priority,
        house: joinHouse.house,
    });

    res.send({ task });
    
});

router.get("/tasks/assign", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    // implement logic HERE
    var assignedTasks = await AssignTask.find({ user: req.currentUser?.id });
    res.send({ assignedTasks });    
});

router.post("/tasks/assign", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    // implement logic HERE
    const assignedTask = await AssignTask.create({
        user: req.currentUser?.id,
        task: req.body.taskId,
        status: "inactive",
        assignedDate: new Date(),
        startDate: new Date(),
    });

    res.send({ assignedTask });
});

router.get("/tasks/all", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const joinHouse = await JoinHouse.findOne({
        user: req.currentUser?.id,
    }).populate("house");

    if (!joinHouse) return res.send({});
    const house = joinHouse.house;
    var tasks = await Task.find({ house: house._id });
    
    res.send({ tasks });
});

module.exports = router;
