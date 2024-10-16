const express = require("express");
const currentUser = require("../middlewares/current-user");
const { format, addDays, subDays } = require("date-fns");

const Task = require("../models/task");
const User = require("../models/user");
const JoinHouse = require("../models/joinHouse");
const AssignTask = require("../models/assignTask");

const router = express.Router();

const allocateTask = async (task) => {
    const users = await JoinHouse.find({ house: task.house });
    const userIds = users.map((user) => user.user);
    const assignTasks = await AssignTask.find({
        user: { $in: userIds },
    }).populate("task");

    let taskAllocations = users.map((user) => ({
        user: user.user,
        totalDuration: assignTasks
            .filter(
                (assignTask) => String(assignTask.user) === String(user.user)
            )
            .reduce((acc, assignTask) => acc + assignTask.task.duration, 0),
    }));

    const today = new Date();
    const nextSunday = addDays(today, 7 - today.getDay());
    assignments = [];
    for (
        let date = today;
        date <= nextSunday;
        date = addDays(date, task.frequency)
    ) {
        taskAllocations.sort((a, b) => a.totalDuration - b.totalDuration);

        const taskAllocation = {
            task: task._id,
            user: taskAllocations[0].user,
            status: "inactive",
            assignedDate: new Date(),
            startDate: date,
        };
        assignments.push(taskAllocation);
        taskAllocations[0].totalDuration += task.duration;
    }
    try {
        await AssignTask.create(assignments);
    } catch (e) {
        console.error(e);
    }
};

router.post("/tasks/create", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const { taskname, description, frequency, duration, priority } = req.body;

    const joinHouse = await JoinHouse.findOne({ user: req.currentUser?.id });
    if (!joinHouse) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const task = await Task.create({
        taskname,
        description,
        frequency,
        duration,
        priority,
        house: joinHouse.house,
    });

    await allocateTask(task);

    return res.status(200).send({ task });
});

router.get("/user/tasks", currentUser, async (req, res) => {
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

router.get("/house/tasks/current-week", currentUser, async (req, res) => {
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
        userId: user.userId,
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

    if (activeAssignment.length === 0) {
        const futureAssignments = {};
        assignedTasks.forEach((assignedTask) => {
            const startDate = new Date(assignedTask.startDate);
            const taskId = assignedTask.taskId.toString();

            if (startDate > currentDate) {
                if (
                    !futureAssignments[taskId] ||
                    startDate < new Date(futureAssignments[taskId].startDate)
                ) {
                    futureAssignments[taskId] = assignedTask; // Store the assignment
                }
            }
        });

        activeAssignment = Object.values(futureAssignments);
    }
    
    return res.status(200).send({ activeAssignment });
});

router.get("/house/tasks", currentUser, async (req, res) => {
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

    let activeAssignment = assignedTasks.map(({ user, task, ...assign }) => ({
        userId: user.userId,
        username: user.username,
        fullname: user.fullname,
        ...task,
        ...assign,
    }));

    if (activeAssignment.length === 0) {
        const futureAssignments = {};
        assignedTasks.forEach((assignedTask) => {
            const startDate = new Date(assignedTask.startDate);
            const taskId = assignedTask.taskId.toString();

            if (startDate > currentDate) {
                if (
                    !futureAssignments[taskId] ||
                    startDate < new Date(futureAssignments[taskId].startDate)
                ) {
                    futureAssignments[taskId] = assignedTask; // Store the assignment
                }
            }
        });

        activeAssignment = Object.values(futureAssignments);
    }
    
    return res.status(200).send({ activeAssignment });
});

module.exports = router;
