const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../db/models');

router.get('/', async (req, res) => {
  const comments = await Comment.findAll().catch((err) => {
    res.status(500).json('unable to find comments');
  });
  res.status(200).json(comments);
});

router.post('/:postId', async (req, res) => {
    const fullRequest = req.body;
    fullRequest.post_id = req.params.postId;
    const newComment = await Comment.create(req.body).catch((err) => {
      res.status(500).json('unable to create comment');
    });
    res.status(201).json(newComment);
  });

module.exports = router;