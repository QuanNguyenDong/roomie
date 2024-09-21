const mongoose = require("mongoose");

const answerQuestionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "IceBreakerQuestion",
        },
        answer: {
            type: String,
            required: true,
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

const AnswerQuestion = mongoose.model("AnswerQuestion", answerQuestionSchema);

module.exports = AnswerQuestion;
