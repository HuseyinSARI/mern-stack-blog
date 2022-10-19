const Router = require("express");
const auth = require ("../middleware/authMiddleware");
const router = Router();

const {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById
} = require('../controllers/blogController');

router.get('/',[auth], getBlogs);

router.post('/',[auth], createBlog);

router.put('/:id',[auth], updateBlog);

router.delete('/:id',[auth], deleteBlog);

router.get('/:id',[auth], getBlogById);


module.exports = router;
