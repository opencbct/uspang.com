const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../db/models')

router.get('/', (req, res) => {
  res.render('sign-in');
});

router.get('/users/:username', async (req, res) => {
  const username = req.params.username;
  const dbPosts = await Post.findAll({
    include: {
      model: User,
      model: Comment
    }
  }).catch((err) => {
    res.status(500).json('unable to find posts');
  });

  if(dbPosts){

    const allPosts = dbPosts.map((post) =>
    post.get({ plain: true })
    );

    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    }).catch((err) => {
      res.status(500).json('unable to find user');
    });

    if(user){
      const userId = user.id;
      const dbUserPosts = await Post.findAll({
        where: {
          user_id: userId
        }
      }).catch((err) => {
        res.status(500).json('--------unable to find posts');
      });
    
      if(dbUserPosts){
        const userPosts = dbUserPosts.map((post) =>
        post.get({ plain: true })
        );
        res.render('homepage', {
          userId,
          allPosts,
          userPosts,
          loggedIn: req.session.loggedIn,
        });
      }
    }
  } else {
    const allPosts = [];
    const userPosts = [];
    res.render('homepage', {
      userId,
      allPosts,
      userPosts,
      loggedIn: req.session.loggedIn,
    });
  }
});

router.get('/posts/:postId', async (req, res) => {
  const dbPost = await Post.findOne({ 
    where: {
      id: req.params.postId
  },
  include: [{model: User }, {model: Comment}]
  }).catch((err) => {
    res.status(500).json('unable to find post');
  });

  const post = dbPost.get({ plain: true });

  res.render('post', {
    post,
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
