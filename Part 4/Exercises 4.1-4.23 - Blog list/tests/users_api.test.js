const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const User = require("../models/user");

describe("POST /api/users", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("admin", 10);
        const user = new User({ username: "root", passwordHash });

        await user.save();
    });

    test("if it return a 400 error if username or password is missing", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            name: "Vinicius",
            password: "123456",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if it return a 400 error if username or password is less than 3 characters", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "us",
            password: "pw",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if it return a 409 error if the user already exists", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "root",
            password: "admin",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(409)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd).toEqual(usersAtStart);
    });

    test("if it creates a new user if the data is correct", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: "newuser",
            name: "New User",
            password: "newpassword",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        expect(usersAtEnd.length).toEqual(usersAtStart.length + 1);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
