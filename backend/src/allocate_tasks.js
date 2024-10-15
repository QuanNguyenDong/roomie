const { format, addDays, subDays } = require('date-fns');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const User = require("./models/user");
const House = require("./models/house");
const AssignTask = require("./models/assignTask")
const Task = require("./models/task");
const JoinHouse = require('./models/joinHouse');

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

// This algorithm assigns each user with a set of tasks, making sure that each user has roughly the same amount of work
// This algorithm uses a greedy First-Fit Decreasing algorithm
// This algorithm works by assigning tasks in decreasing work order where the tasks are assigned to the user with current least amount of assigned work
// This doesn't necessarily result in the best allocation however true solutions are much more computationally expensive and this should suit our needs

// Inputs:
//   - List of tasks (taskId, duration, frequency)
//   - List of users (userId)
// Outputs:
//   - List of tasks for each users
const allocateTasks = async (house) => {
    var tasks = await Task.find({house: "66e96c9b1cb10cee92bf5572"});
    var users = await JoinHouse.find({house: "66e96c9b1cb10cee92bf5572"});    
    var assignTasks = await AssignTask.find();
    await AssignTask.deleteMany();
    
    let taskAllocations = [];

    // Create new TaskAllocation object for each user
    users.forEach(user => {
        taskAllocations.push({
            user: user.user,
            totalDuration: 0
        });
    });

    // Sort tasks in descending order based on work amount
    tasks.sort((a, b) => taskSort(b) - taskSort(a));

    tasks.forEach(task => {
        // If this task doesn't need to be assigned this cycle, skip it
        if (addDays(getLastAssignedDate(task), task.frequency) > addDays(new Date(), 7)) {            
            return;
        }

        // If tasks have to be allocated multiple times within a week we can't just allocate once to a user and continue
        for (let i = 1; i < 8; i += task.frequency) {
            // Sort all TaskAllocation objects ascending by how much work they have been assigned
            taskAllocations.sort((a, b) => taskAllocationSort(a) - taskAllocationSort(b));

            // Assign the current task to the user with the least amount of allocated work
            const taskAllocation = {
                task: task._id,
                user: taskAllocations[0].user,
                status: "inactive",
                assignedDate: new Date(),
                startDate: addDays(new Date(), i),
            }
            AssignTask.create(taskAllocation);
            taskAllocations[0].totalDuration += task.duration;
        }
    });
};

const allocateTask = async (task) => {
    // Fetch users from the house where this task belongs
    const users = await JoinHouse.find({ house: task.house });

    // Fetch all existing task assignments for this house
    const assignTasks = await AssignTask.find({ house: task.house });

    // Create task allocation object for each user, summing up their total allocated work
    let taskAllocations = users.map(user => ({
        user: user.user,
        totalDuration: assignTasks
            .filter(assignTask => String(assignTask.user) === String(user.user))
            .reduce((acc, assignTask) => acc + task.duration, 0)
    }));

    // Get the next Sunday from today
    const today = new Date();
    const nextSunday = addDays(today, 7 - today.getDay());

    // Sort taskAllocations by totalDuration (least assigned work first)
    taskAllocations.sort((a, b) => a.totalDuration - b.totalDuration);

    // Loop to assign the task as many times as necessary based on its frequency
    for (let date = today; date <= nextSunday; date = addDays(date, task.frequency)) {
        // Re-sort to ensure the user with the least amount of work gets the next task
        taskAllocations.sort((a, b) => a.totalDuration - b.totalDuration);

        // Assign the current task to the user with the least amount of work
        const taskAllocation = {
            task: task._id,
            user: taskAllocations[0].user,            
            status: "inactive",
            assignedDate: new Date(),
            startDate: date,
        };

        // Save the task allocation to the database
        await AssignTask.create(taskAllocation);

        // Update the user's total work after the task is assigned
        taskAllocations[0].totalDuration += task.duration;        
    }
};


function taskSort(task) {
    return task.duration;
}

function taskAllocationSort(taskAllocation) {
    return taskAllocation.totalDuration;
}

function getLastAssignedDate(task) {
    return subDays(new Date(), 8);
}

const start = async () => 
{
    const house = '66e96c9b1cb10cee92bf5572';
    await allocateTasks(house)
};

start();

module.exports = { allocateTask };