// controllers/articlesController.js
const Article = require('../models/article');
const Comment = require('../models/comment');

// Display the article creation form
exports.createForm = (req, res) => {
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
  }else{

    res.redirect('/login');
  }
  

  res.render('articles/create', {  hbsContent: hbsContent});
  
};

// Handle the article creation form submission
exports.createArticle = (req, res) => {
  // Retrieve form data
  const { title, content } = req.body;
  const loggedInUser = req.session.user;

  // Create a new article
  const article = new Article({
    title,
    content,
    userId: loggedInUser.id 
    // Additional properties if necessary
  });

  // Save the article to the database
  article.save()
    .then(() => {
      // Redirect to a success page or perform other actions
      res.redirect('/dashboard');
    })
    .catch((err) => {
      // Handle error and display an error message
      console.error(err);
      res.render('articles/create', { error: 'Failed to create article' });
    });
};
