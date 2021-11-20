const express = require('express');
const router = express.Router();
const Post = require('../../db/models/Post.js');
const User = require('../../db/models/User.js');
const Comment = require('../../db/models/Comment.js');

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [{model: User }, {model: Comment}]
  }).catch((err) => {
    res.status(500).json('unable to find posts');
  });
  res.status(200).json(posts);
});

router.post('/', async (req, res) => {
  const newPost = await Post.create(req.body).catch((err) => {
    res.status(500).json('unable to create post');
  });
  res.status(201).json(newPost);
});

router.get('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  }).catch((err) => {
    res.status(500).json('unable to find user');
  });

  if (user) {
    const user_id = user.id;

    if (user_id) {
      const posts = await Post.findAll({
        where: {
          user_id: user_id,
        },
      }).catch((err) => {
        res.status(500).json('unable to find posts');
      });
      res.status(200).json(posts);
    }
  } else {
    res.status(404).json('no user with posts');
  }
});

module.exports = router;
