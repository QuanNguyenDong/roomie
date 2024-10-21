const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventname: {
            type: String,
            required: true,
        },
        startDate: {
            type: Date,
            // default: Date.now,
            required: true,
        },
        endDate: {
            type: Date,
            // default: Date.now,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.eventId = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
