const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        // define your data
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.taskId = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
