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

  const { title, content } = req.body;
  const loggedInUser = req.session.user;


  const article = new Article({
    title,
    content,
    userId: loggedInUser.id 

  });


  article.save()
    .then(() => {

      res.redirect('/dashboard');
    })
    .catch((err) => {

      console.error(err);
      res.render('articles/create', { error: 'Failed to create article' });
    });
};


exports.editForm = (req, res) => {
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
  
  const articleId = req.params.id;

  (async () => {
    try {
      const article = await fetchArticleById(articleId);

      res.render('articles/edit', { hbsContent: hbsContent, article: article });
    } catch (error) {
      console.error('Error fetching article:', error);
      res.render('articles/edit', { hbsContent: hbsContent, article: null });
    }
  })();
};

async function fetchArticleById(articleId) {
  try {
    const article = await Article.findByPk(articleId);
    return article;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
}


exports.editArticle = (req, res) => {
  
  const { title, content } = req.body;
  
  const articleId = req.params.id;

  Article.update(
    { title, content },
    { where: { id: articleId } }
  )
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.error('Error updating article:', error);
      res.render(`articles/${articleId}/edit`, { error: 'Failed to update article' });
    });
  
};


exports.deleteArticle = (req, res) => {
  const articleId = req.params.id;

  Article.destroy({ where: { id: articleId } })
    .then(() => {
      res.redirect('/dashboard');
    })
    .catch((error) => {
      console.error('Error deleting article:', error);
      res.redirect('/dashboard', { error: 'Failed to delete article' });
    });
};


exports.viewForm = (req, res) => {
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
  

  const articleId = req.params.id;
  console.log("articleId ",articleId);
  (async () => {
    try {
      const article = await fetchArticleById(articleId);
      const comments =  await fetchCommentsByArticleId(articleId);
      
      console.log("view fetched article ", article);
     console.log(" view fetched comments ", comments);

      res.render('articles/view', { hbsContent: hbsContent, article: article, comments: comments });
    } catch (error) {
      console.error('Error fetching article:', error);
      res.render('articles/view', { hbsContent: hbsContent, article: null, comments:[] });
    }
  })();

 
  
};


async function fetchCommentsByArticleId(articleId) {
  try {
    const comments = await Comment.findAll({
      where: { articleId: articleId}, // Filter by the article's id
      include: 'user',
    });
    return comments;
  } catch (error) {
    console.error('Error fetching comments for article:', error);
    throw error;
  }
}
