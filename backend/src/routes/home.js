const express = require("express");
const currentUser = require("../middlewares/current-user");
const { body } = require("express-validator");
const validateRequest = require("../middlewares/validate-request");

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
    users = users.filter((user) => user.user);
    users = users.map((user) => user.user);
    res.send({
        house,
        users,
    });
});

router.post(
    "/home/create",
    [
        body("code")
            .trim()
            .isLength({ min: 5, max: 5 })
            .withMessage("Code is length of 5"),
    ],
    validateRequest,
    currentUser,
    async (req, res) => {
        const user = await User.findById(req.currentUser?.id);
        if (!user) return res.status(401).send({ message: "Unauthorized" });

        // Check if user already in a house
        const joinHouse = await JoinHouse.findOne({
            user: req.currentUser?.id,
        }).populate("house");
        if (joinHouse)
            return res.status(400).send({ message: "User already in a house" });

        try {
            const { code } = req.body;
            var house = await House.findOne({ code });
            if (house)
                return res
                    .status(400)
                    .send({ message: "House already exists" });

            house = await House.create({ code });
            join = await JoinHouse.create({
                user: user._id,
                house: house._id,
            });
            return res.status(200).send({ message: "House created" });
        } catch (error) {
            return res.status(404).send(error);
        }
    }
);

router.post(
    "/home/join",
    [
        body("code")
            .trim()
            .isLength({ min: 5, max: 5 })
            .withMessage("Code is length of 5"),
    ],
    validateRequest,
    currentUser,
    async (req, res) => {
        const user = await User.findById(req.currentUser?.id);
        if (!user) return res.status(401).send({ message: "Unauthorized" });

        // Check if user already in a house
        const joinHouse = await JoinHouse.findOne({
            user: req.currentUser?.id,
        }).populate("house");
        if (joinHouse)
            return res.status(400).send({ message: "User already in a house" });

        try {
            const { code } = req.body;
            var house = await House.findOne({ code });
            if (!house)
                return res.status(400).send({ message: "Code isn't exist" });

            join = await JoinHouse.create({
                user: user._id,
                house: house._id,
            });
            return res.status(200).send({ message: "User joined new house" });
        } catch (error) {
            return res.status(404).send(error);
        }
    }
);

router.delete("/home/leave", currentUser, async (req, res) => {
    const user = await User.findById(req.currentUser?.id);
    if (!user) return res.status(401).send({ message: "Unauthorized" });

    var house = await JoinHouse.findOne({
        user: user.id,
    });
    house = house.house;

    await JoinHouse.deleteOne({ user: user.id });
    const count = await JoinHouse.countDocuments({ house });
    if (count == 0) await House.deleteOne({ _id: house });

    res.status(200).send({ message: "User left house" });
});

module.exports = router;
