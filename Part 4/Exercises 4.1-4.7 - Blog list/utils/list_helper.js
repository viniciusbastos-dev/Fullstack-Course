const _ = require("lodash");

const dummy = (blogs) => {
    console.log(blogs);
    return 1;
};

const totalLikes = (blogs) => {
    if (blogs.length === 0) return 0;

    if (blogs.length === 1) return blogs[0].likes;

    const reducer = (sum, item) => {
        return sum + item.likes;
    };

    return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    const reducer = (higher, actual) => {
        return actual.likes > higher.likes ? actual : higher;
    };

    return blogs.reduce(reducer, blogs[0]);
};

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, "author");

    const topAuthor = _.maxBy(
        Object.keys(blogsByAuthor),
        (author) => blogsByAuthor[author].length
    );

    return {
        author: topAuthor,
        blogs: blogsByAuthor[topAuthor].length,
    };
};

const mostLikes = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, "author");

    const topAuthor = _.maxBy(Object.keys(blogsByAuthor), (author) =>
        _.sumBy(blogsByAuthor[author], "likes")
    );

    return {
        author: topAuthor,
        likes: _.sumBy(blogsByAuthor[topAuthor], "likes"),
    };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
