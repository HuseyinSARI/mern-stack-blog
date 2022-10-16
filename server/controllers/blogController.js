const Blog = require("../models/Blog");
const colors =  require("colors");

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


// @desc    Create blog with user id
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
        const blog = await newBlog.save();  
        res.json(blog);
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
}

// @desc    Create blog with user id
// @route   "/api/blogs"
// @access  Private
const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
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
        res.send("Deleting Blog...")
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