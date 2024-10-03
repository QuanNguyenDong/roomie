const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    {
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            required: true,
        },
        user : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        reviewText: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.reviewId = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;