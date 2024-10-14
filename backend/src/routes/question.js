const express = require("express");
const currentUser = require("../middlewares/current-user");
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validate-request");

const Question = require("../models/question");
const User = require("../models/user");
const answerQuestion = require("../models/answerQuestion");

const router = express.Router();

router.get("/questions", async (req, res) => {
    var questions = await Question.find();
    res.send(questions);
});

router.post(
    "/answers",
    [body("answers").isArray()],
    validateRequest,
    currentUser,
    async (req, res) => {
        const user = await User.findById(req.currentUser?.id);
        if (!user) return res.status(401).send({ message: "Unauthorized" });

        try {
            var { answers } = req.body;
            answers = answers.map((answer) => ({
                user: user.id,
                question: answer?.question,
                answer: answer?.answer,
            }));

            answers = await answerQuestion.create(answers);
            return res.status(200).json(answers);
        } catch (error) {
            var msg = error?.message;
            return res.status(404).json({ error: msg });
        }
    }
);

module.exports = router;
