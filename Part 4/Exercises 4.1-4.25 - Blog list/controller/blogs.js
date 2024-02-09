const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1,
    });
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user._id,
        likes: body.likes || 0,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    const body = request.body;

    const blog = {
        likes: body.likes,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
    });

    response.json(updatedBlog);
});

module.exports = blogsRouter;
