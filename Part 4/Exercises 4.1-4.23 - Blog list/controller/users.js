const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", { likes: 0, user: 0 });
    response.json(users);
});

usersRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    if (!password) {
        return response.status(400).json({ error: "Password missing" });
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: "Username and Password must have at least 3 characters.",
        });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name: name || username,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = usersRouter;
