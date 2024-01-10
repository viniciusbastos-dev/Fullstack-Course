const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    const emptyList = [];

    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0,
        },
    ];

    const biggerListOfBlogs = [
        {
            title: "Blog Post 1",
            author: "Author 1",
            url: "https://example.com/post1",
            likes: 10,
        },
        {
            title: "Blog Post 2",
            author: "Author 2",
            url: "https://example.com/post2",
            likes: 15,
        },
        {
            title: "Blog Post 3",
            author: "Author 1",
            url: "https://example.com/post3",
            likes: 20,
        },
        {
            title: "Blog Post 4",
            author: "Author 3",
            url: "https://example.com/post4",
            likes: 8,
        },
        {
            title: "Blog Post 5",
            author: "Author 2",
            url: "https://example.com/post5",
            likes: 12,
        },
        {
            title: "Blog Post 6",
            author: "Author 4",
            url: "https://example.com/post6",
            likes: 25,
        },
        {
            title: "Blog Post 7",
            author: "Author 3",
            url: "https://example.com/post7",
            likes: 18,
        },
    ];

    test("of empty list is zero", () => {
        const result = listHelper.totalLikes(emptyList);

        expect(result).toBe(0);
    });

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);

        expect(result).toBe(5);
    });

    test("of a bigger list is calulated right", () => {
        const result = listHelper.totalLikes(biggerListOfBlogs);

        expect(result).toBe(108);
    });
});

describe("favorite blog", () => {
    const biggerListOfBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        },
        {
            title: "Understanding the Event Loop in JavaScript",
            author: "John Resig",
            likes: 25,
        },
        {
            title: "Data Structures and Algorithms",
            author: "Ada Lovelace",
            likes: 8,
        },
        {
            title: "Web Development Best Practices",
            author: "Brendan Eich",
            likes: 15,
        },
        {
            title: "Artificial Intelligence: A Brief History",
            author: "Alan Turing",
            likes: 20,
        },
        {
            title: "The Joy of Coding",
            author: "Grace Hopper",
            likes: 18,
        },
        {
            title: "Functional Programming Concepts",
            author: "Haskell Curry",
            likes: 30,
        },
        {
            title: "Responsive Web Design Techniques",
            author: "Ethan Marcotte",
            likes: 22,
        },
        {
            title: "Introduction to Quantum Computing",
            author: "Richard Feynman",
            likes: 14,
        },
        {
            title: "CSS Grid Layout Explained",
            author: "Rachel Andrew",
            likes: 17,
        },
    ];

    const object = {
        title: "Functional Programming Concepts",
        author: "Haskell Curry",
        likes: 30,
    };

    test("of a list that returns the right object", () => {
        const result = listHelper.favoriteBlog(biggerListOfBlogs);

        expect(result).toEqual(object);
    });
});
