const mongoose = require("mongoose");


const assignTaskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,            
            ref: "User",
            required: true,
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,            
            ref: "Task",
            required: true,
        },
        status: {
            type: String,
            enum: ["inactive", "active", "completed"],
            default: "inactive",
            required: true,
        },
        assignedDate: {
            type: Date,
            default: Date.now,
            required: true,
        },
        startDate: {
            type: Date,
            default: Date.now,
            required: true,
        },
        completedDate: {
            type: Date,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const AssignTask = mongoose.model("AssignTask", assignTaskSchema);

module.exports = AssignTask;