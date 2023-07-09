const express = require('express');
const router = express.Router();

const hbsContent = { userName: '', loggedin: false, title: 'You are not logged in', body: 'Hello' };

router.get('/', (req, res) => {
  if (req.session.user && req.cookies.user_sid) {
    hbsContent.loggedin = false;
    hbsContent.title = 'You are logged out';
    res.clearCookie('user_sid');
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
