const express = require("express");
const Question = require("../models/question");

const router = express.Router();

router.get("/questions", async(req, res) => {
    var questions = await Question.find();    
    res.send(questions);
});

module.exports = router;