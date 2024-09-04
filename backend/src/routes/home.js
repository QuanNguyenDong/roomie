const express = require("express");
const currentUser = require("../middlewares/current-user");
const User = require("../models/user");
const House = require("../models/house");
const JoinHouse = require("../models/joinHouse");

const router = express.Router();

router.get("/home", currentUser, async (req, res) => {
    const joinHouse = await JoinHouse.findOne({
        user: req.currentUser?.id,
    }).populate("house");

    if (!joinHouse) return res.send({});

    const house = joinHouse.house;
    var users = await JoinHouse.find({ house: house._id }).populate("user");
    users = users.filter(user => user.user)
    users = users.map(user => user.user)
    res.send({
        house,
        users
    });
});

module.exports = router;
