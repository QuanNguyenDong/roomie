const express = require("express");
const currentUser = require("../middlewares/current-user");

const Task = require("../models/task");
const User = require("../models/user");

const router = express.Router();

router.get("/tasks/assign", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    // implement logic HERE

    res.send({ message: "alive" });
});

router.post("/tasks/assign", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    // implement logic HERE

    res.send({ message: "alive" });
});

module.exports = router;
