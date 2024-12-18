const mongoose = require("mongoose");

const houseSchema = mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
            maxLength: 5,
            minLength: 5
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
