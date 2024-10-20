const express = require("express");
const currentUser = require("../middlewares/current-user");
const User = require("../models/user");
const Question = require("../models/question");
const AnswerQuestion = require("../models/answerQuestion");

const router = express.Router();

router.get("/users/profile", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) return res.status(401).send({ message: "Unauthorized" });

    var answers = await AnswerQuestion.find({
        user: req.currentUser?.id,
    }).populate("question");

    if (answers) {
        answers = answers.map((item) => ({
            question: item.question.question,
            answer: item.answer,
        }));
    }

    res.send({
        ...user.toJSON(),
        answers: answers,
    });
});

module.exports = router;
