const express = require('express');
const router = express.Router();
const userRoutes = require('./users.js');
const postRoutes = require('./posts.js');
const commentRoutes = require('./comments.js');

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);

module.exports = router;