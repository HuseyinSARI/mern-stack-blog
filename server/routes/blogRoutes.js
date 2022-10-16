const Router = require("express");
const auth = require ("../middleware/authMiddleware");
const router = Router();

const {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../controllers/blogController');

router.get('/',[auth], getBlogs);

router.post('/',[auth], createBlog);

router.put('/',[auth], updateBlog);

router.get('/:id',[auth], deleteBlog);


module.exports = router;
