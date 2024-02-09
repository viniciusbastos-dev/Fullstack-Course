const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

test("returns the correct number of blog posts in JSON format", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("each blog should have a unique identifier named 'id'", async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
        expect(blog.id).toBeDefined();
        expect(blog._id).toBeUndefined();
    });
});

test("if creates a new blog post", async () => {
    const users = await helper.usersInDb();

    const userForToken = {
        username: users[0].username,
        id: users[0].id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);

    const newBlog = {
        title: "New Blog Post",
        author: "Brendom",
        url: "http://example.com",
        likes: 100,
    };

    await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).toContain(newBlog.title);
});

test("fails with status 401 Unauthorized if token is not provided", async () => {
    const newBlog = {
        title: "New Blog Post",
        author: "Brendom",
        url: "http://example.com",
        likes: 100,
    };

    await api.post("/api/blogs").send(newBlog).expect(401);
});

test("if 'likes' property is missing, it defaults to 0", async () => {
    const newBlogWithoutLikes = {
        title: "Blog Without Likes",
        author: "John Doe",
        url: "http://example.com",
    };

    const response = await api
        .post("/api/blogs")
        .send(newBlogWithoutLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

describe("when creating a new blog post", () => {
    test("responds with 400 Bad Request if 'title' is missing", async () => {
        const newBlogWithoutTitle = {
            author: "Jane Doe",
            url: "http://example.com",
        };

        await api.post("/api/blogs").send(newBlogWithoutTitle).expect(400);
    });

    test("responds with 400 Bad Request if 'url' is missing", async () => {
        const newBlogWithoutUrl = {
            title: "Missing URL Blog",
            author: "John Smith",
        };

        await api.post("/api/blogs").send(newBlogWithoutUrl).expect(400);
    });
});

describe("deletion of a blog", () => {
    test("DELETE /api/blogs/:id responds with status 204 if blog id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const titles = blogsAtEnd.map((blog) => blog.title);

        expect(titles).not.toContain(blogToDelete.title);
    });
});

describe("updating a blog", () => {
    test("PUT /api/blogs/:id updates blog likes correctly", async () => {
        const blogsBeforeUpdate = await helper.blogsInDb();
        const blogToUpdate = blogsBeforeUpdate[0];
        const updatedLikes = 10;

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes: updatedLikes })
            .expect(200);

        const blogsAfterUpdate = await helper.blogsInDb();
        expect(blogsAfterUpdate).toHaveLength(helper.initialBlogs.length);

        const updatedBlog = blogsAfterUpdate.find(
            (blog) => blog.id === blogToUpdate.id
        );
        expect(updatedBlog.likes).toBe(updatedLikes);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
