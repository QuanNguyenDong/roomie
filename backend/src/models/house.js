const mongoose = require("mongoose");

const houseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.houseId = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const House = mongoose.model("House", houseSchema);

module.exports = House;
