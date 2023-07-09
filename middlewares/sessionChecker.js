const moment = require('moment');
const Article = require('../models/article');
const hbsContent = {
  userName: '',
  loggedin: false,
  title: 'You are not logged in',
  body: 'Hello',
};
articles:[]
const sessionChecker = async (req, res, next) => {
  try {
     articles = await Article.findAll({
      include: 'user', // Include the 'user' association to retrieve the user information
      order: [['createdAt', 'DESC']], // Sort articles by the created date in descending order
    });

  
  } catch (err) {
    console.error(err);
  }

  if (req.session.user && req.cookies.user_sid) {
    hbsContent.loggedin = true;
    hbsContent.userName = req.session.user.username;
    hbsContent.title = 'You are logged in';

    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Pragma', 'no-cache');

   
    res.render('index', { articles, hbsContent: hbsContent, moment:moment  });
    
 
  } else {
    next();
  }
};

module.exports = sessionChecker;
