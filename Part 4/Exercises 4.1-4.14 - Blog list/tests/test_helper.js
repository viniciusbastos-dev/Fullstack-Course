const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "Diamond IV in five days",
        author: "Vinícius Bastos",
        url: "http://localhost:3001/post/1",
        likes: 100,
    },
    {
        title: "Silver IV in five days",
        author: "Bard",
        url: "http://localhost:3001/post/2",
        likes: 100,
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs,
    blogsInDb,
};
