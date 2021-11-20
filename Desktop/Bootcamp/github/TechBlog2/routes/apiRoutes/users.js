const express = require('express');
const router = express.Router();
const User = require('../../db/models/User.js');
//end path: /api/users

router.get('/', async (req, res) => {
  const users = await User.findAll().catch((err) => {
    res.status(500).json('unable to find users');
  });
  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const newUser = await User.create(req.body).catch((err) => {
    res.status(500).json('unable to create user');
  });
  req.session.save(() => {
    req.session.loggedIn = true;
    res.status(201).json(newUser);
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/sign-in/:username', async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
  }).catch((err) => {
    res.status(500).json('error finding users :(');
  });
  if(user){
    const validated = await user.validatePassword(req.body.password).catch(err => {
      res.status(404).json('invalid login');
    });
    if(validated){
      req.session.save(() => {
        req.session.loggedIn = true;
        res.status(202).json(validated);
      });
    } else {
      res.status(404).json('invalid username or password');
    }
  }

});

module.exports = router;
