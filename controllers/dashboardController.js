const moment = require('moment');
const express = require('express');
const router = express.Router();
const Article = require('../models/article');

router.get('/', (req, res) => {
  const hbsContent = {
    userName: '',
    loggedin: false,
    title: 'You are not logged in',
    body: 'Hello',
  };

  if (req.session.user && req.cookies.user_sid) {
    hbsContent.loggedin = true;
    hbsContent.userName = req.session.user.username;
    hbsContent.title = 'You are logged in';
    const userId = req.session.user.id;
    Article.findAll({
      where: { userId }, 
      include: 'user', // Include the 'user' association to retrieve the user information
      order: [['createdAt', 'DESC']], // Sort articles by the created date in descending order
    })
      .then((articles) => {
  
        res.render('dashboard', { articles, hbsContent: hbsContent, moment:moment  });
      })
      .catch((err) => {
        console.error(err);
        res.render('dashboard', { articles: [], hbsContent: hbsContent, moment: moment }); // Handle the error and render the view with an empty articles array
      });
 

  }else{

    res.redirect('/login');
  }
  
});

module.exports = router;
