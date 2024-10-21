const express = require("express");
const currentUser = require("../middlewares/current-user");

const Review = require("../models/review");
const User = require("../models/user");

const router = express.Router();

router.get("/reviews", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const reviews = await Review.find({ user: req.currentUser?.id }).populate('task', 'taskname');    

    // Map the data to match the required structure
    const reviewDataMap = reviews.reduce((acc, review) => {
        const taskName = review.task.taskname;
        const reviewText = { reviewText: review.reviewText };

        // Find the task in the accumulator or create a new entry if it doesn't exist
        const taskEntry = acc.find(entry => entry.title === taskName);
        if (taskEntry) {
            taskEntry.reviews.push(reviewText);
        } else {
            acc.push({
                title: taskName,
                reviews: [reviewText],
            });
        }

        return acc;
    }, []);    
    res.send({ reviewData: reviewDataMap });
});

router.post("/reviews", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    let reviews = req.body;

    reviews = reviews.map(({ taskId, userId, reviewText }) => ({
        task: taskId,
        user: userId,
        reviewText
    }));

    const insertedReviews = await Review.insertMany(reviews);
    res.send(insertedReviews);
});

router.post("/users/:userId/stars", async (req, res) => {
    const userId = req.params.userId;
    const { amount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.stars += amount;
        await user.save();

        res.status(200).json({ message: "Stars added successfully", user });
    } catch (error) {
        console.error("Error adding stars:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;