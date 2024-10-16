const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullname: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        stars : {
            type: Number,
            default: 0,
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.userId = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
