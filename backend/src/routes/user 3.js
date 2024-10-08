const express = require("express");
const currentUser = require("../middlewares/current-user");

const User = require("../models/user");
const { model } = require("mongoose");

const router = express.Router();

router.get("/users", currentUser, async (req, res) => {
    const currentUser = await User.findById(req.currentUser?.id);
    if (!currentUser) {
        res.status(401).send({ message: "Unauthorized" });
        return;
    }

    const userId = req.query.user;    

    const user = await User.findById(userId);    
    if (!user)
    {
        return res.status(404).send({ message: "User not found" });
    }

    const { username, email, _id, desc, fullname } = user;  // Specify the fields you want
    return res.status(200).send({ user: { username, email, _id, desc, fullname } });    
});

module.exports = router;