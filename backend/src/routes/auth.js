const express = require("express");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const validateRequest = require("../middlewares/validate-request");

const User = require("../models/user");

const router = express.Router();

router.post(
    "/users/signup",
    [
        body("username").trim().notEmpty().withMessage("Username is required"),
        body("username").custom(async (username) => {
            const user = await User.findOne({ username });
            if (user) throw new Error("Username already exists");
        }),
        body("password")
            .trim()
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long"),
        body("fullname").trim().notEmpty().withMessage("Full name is required"),
    ],
    validateRequest,
    async (req, res) => {
        try {
            const { username, password, fullname, desc, stars } = req.body;
    
            const user = await User.create({
                username,
                password,
                fullname,
                desc,
                stars,
            });
    
            const userJwt = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                },
                process.env.JWT_KEY,
                { expiresIn: "14d" }
            );
    
            req.session = { jwt: userJwt };
            return res.status(201).json(user);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
);

router.post(
    "/users/signin",
    [
        body("username").trim().notEmpty().withMessage("Username is required"),
        body("password")
            .trim()
            .isLength({ min: 5 })
            .withMessage("Password must be at least 5 characters long"),
    ],
    validateRequest,
    async (req, res) => {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            res.status(401).send({ message: "Invalid username" });
            return;
        }

        const passwordsMatch = password.localeCompare(existingUser.password);
        if (passwordsMatch != 0) {
            res.status(401).send({ message: "Invalid password" });
            return;
        }

        // Generate JWT
        const userJwt = jwt.sign(
            {
                id: existingUser.id,
                username: existingUser.username,
            },
            process.env.JWT_KEY
        );

        // Store it on session object
        req.session = { jwt: userJwt };
        res.status(200).send(existingUser);
    }
);

router.post("/users/signout", (req, res) => {
    req.session = null;

    res.send({});
});

module.exports = router;
