const Blog = require("../models/Blog");

// @desc    Get all blogs by user id
// @route   "/api/blogs"
// @access  Private
const getBlogs = async (req, res) => {
    try {
        // Try fo find blog ind DB
        const blogs = await Blog.find({ user: req.user.id });
        res.json(blogs);

    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
}


// @desc    POST blog with user id
// @route   "/api/blogs"
// @access  Private
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            user: req.user.id    // Its getting from token
        });

        await newBlog.save();

        // if (!newBlog) return res.status(400).json([{ message: "Blog not created", type: "error" }]);

        res.json(newBlog);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
}

// @desc    PUT Update blog posts 
// @route   "/api/blogs"
// @access  Private
const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate({
            _id: req.params.id,  // Get it from request params
            user: req.user.id    // Provided through the token
        }, {
            title,
            content
        }, {
            new: true
        })

        res.json(blog);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
}

const deleteBlog = async (req, res) => {
    try {
        await Blog.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })
        res.json([{ message: "Blog deleted", type: "success" }]);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
}