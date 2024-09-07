const mongoose = require("mongoose");

const joinHouseSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            unique: true,
            ref: "User",
        },
        house: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "House",
        }
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

const JoinHouse = mongoose.model("JoinHouse", joinHouseSchema);

module.exports = JoinHouse;
