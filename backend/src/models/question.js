const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.questionId = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Question = mongoose.model("IceBreakerQuestion", questionSchema);

module.exports = Question;
