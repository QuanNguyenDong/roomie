const express = require("express");
const currentUser = require("../middlewares/current-user");
const User = require("../models/user");

const router = express.Router();

router.get("/users/profile", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    res.send(user);
});

module.exports = router;
