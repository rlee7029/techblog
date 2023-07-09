const express = require('express');
const router = express.Router();
const User = require('../models/user');

const hbsContent = { userName: '', loggedin: false, title: 'You are not logged in', body: 'Hello' };

router.get('/', (req, res) => {
  res.render('signup', hbsContent);
});

router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      req.session.user = user.dataValues;
      res.redirect('./');
    })
    .catch((error) => {
      res.redirect('/signup');
    });
});

module.exports = router;
