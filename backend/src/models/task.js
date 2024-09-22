const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        // define your data
        taskname: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        frequency: {
            type: Number, // Frequency in days
            required: true,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        duration: {
            type: Number, // Duration in minutes
            required: true,
            validate: {
                validator: Number.isInteger,
                message: "{VALUE} is not an integer value",
            },
        },
        priority: {
            type: String,
            required: true,
            enum: ['Low', 'Medium', 'High'], // Enum values
        },
        house: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "House",
        }
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
