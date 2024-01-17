const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});

test("blog list application returns the correct amount of blog posts in the JSON format", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("should have a unique identifier named id", async () => {
    const blogs = await helper.blogsInDb();
    blogs.forEach((blog) => {
        expect(blog.id).toBeDefined();

        expect(blog._id).toBeUndefined();
    });
});

test("should create a new blog post on POST request", async () => {
    const newBlog = {
        title: "New Blog Post",
        author: "Brendom",
        url: "http://example.com",
        likes: 100,
    };

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((blog) => blog.title);

    expect(titles).toContain(newBlog.title);
});

test("if likes property is missing, it defaults to 0", async () => {
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

describe("missing required properties", () => {
    test("if title is missing, respond with 400 Bad Request", async () => {
        const newBlogWithoutTitle = {
            author: "Jane Doe",
            url: "http://example.com",
        };

        await api.post("/api/blogs").send(newBlogWithoutTitle).expect(400);
    });

    test("if url is missing, respond with 400 Bad Request", async () => {
        const newBlogWithoutUrl = {
            title: "Missing URL Blog",
            author: "John Smith",
        };

        await api.post("/api/blogs").send(newBlogWithoutUrl).expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
