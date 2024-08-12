const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts');

router.get('/', PostsController.getPosts);
routert.post('/', PostsController.createPosts);

module.exports = router;
