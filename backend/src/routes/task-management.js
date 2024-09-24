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

router.get("/tasks/assigned", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    var assignedTasks = await AssignTask.find({ user: req.currentUser?.id })
        .populate("user")
        .populate("task");

    assignedTasks = assignedTasks.map((task) => task.toJSON());

    assignedTasks = assignedTasks.map(({ user, task, ...assign }) => ({
        username: user.username,
        fullname: user.fullname,
        ...task,
        ...assign,
    }));

    return res.status(200).send({ assignedTasks });
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

router.get("/tasks/activeAssignment", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const taskId = req.query.task; // Use query parameters instead of body

    // Get the current date
    const currentDate = new Date();
    const task = await Task.findById(taskId);
    const assignedTasks = await AssignTask.find({ task: taskId });

    // Find the active task assignment where the current date is in the valid range
    // Find the active task assignment where the current date is in the valid range
    let activeAssignment = assignedTasks.find((assignedTask) => {
        const startDate = new Date(assignedTask.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + task.frequency); // Add task frequency to get the end date

        // Check if current date is within startDate and endDate
        return currentDate >= startDate && currentDate <= endDate;
    });

    if (!activeAssignment) {
        // Filter tasks with startDate in the future
        const futureTasks = assignedTasks.filter((assignedTask) => {
            const startDate = new Date(assignedTask.startDate);
            return startDate > currentDate;
        });

        // Sort by startDate and get the closest one
        if (futureTasks.length > 0) {
            futureTasks.sort(
                (a, b) => new Date(a.startDate) - new Date(b.startDate)
            );
            activeAssignment = futureTasks[0]; // Get the closest one
        }
    }
    // Return the active assignment
    return res.status(200).send({ activeAssignment });
});

router.get("/tasks/all/active", currentUser, async (req, res) => {
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
    taskIds = tasks.map((task) => task._id);

    const currentDate = new Date();
    var assignedTasks = await AssignTask.find({ task: { $in: taskIds } })
        .populate("task")
        .populate("user");
    assignedTasks = assignedTasks.map((task) => task.toJSON());

    assignedTasks = assignedTasks.map(({ user, task, ...assign }) => ({
        username: user.username,
        fullname: user.fullname,
        ...task,
        ...assign,
    }));

    let activeAssignment = assignedTasks.filter((assignedTask) => {
        const startDate = new Date(assignedTask.startDate);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + assignedTask.frequency); // Add task frequency to get the end date

        return currentDate >= startDate && currentDate <= endDate;
    });

    if (!activeAssignment) {
        const futureTasks = assignedTasks.filter((assignedTask) => {
            const startDate = new Date(assignedTask.startDate);
            return startDate > currentDate;
        });

        if (futureTasks.length > 0) {
            futureTasks.sort(
                (a, b) => new Date(a.startDate) - new Date(b.startDate)
            );
            activeAssignment = futureTasks[0]; // Get the closest one
        }
    }

    return res.status(200).send({ activeAssignment });
});

module.exports = router;
