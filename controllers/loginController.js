const express = require('express');
const router = express.Router();
const User = require('../models/user');

const hbsContent = { userName: '', loggedin: false, title: 'You are not logged in', body: 'Hello' };

router.get('/', (req, res) => {
  res.render('login', hbsContent);
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ where: { username } }).then((user) => {
    if (!user) {
      res.redirect('/login');
    } else if (!user.validPassword(password)) {
      res.redirect('/login');
    } else {
      req.session.user = user.dataValues;
      res.redirect('/');
    }
  });
});

module.exports = router;
