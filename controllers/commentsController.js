const Comment = require('../models/comment');

// Handle comment creation
exports.createComment = (req, res) => {
  const  articleId  = req.params.articleId;
  const { comment } = req.body;
  const loggedInUser = req.session.user;


  Comment.create({
    comment:comment,
    articleId:articleId,
    userId: loggedInUser.id 
  })
    .then(() => {
      res.redirect(`/articles/${articleId}/view`);
    })
    .catch((err) => {
      console.error(err);
      res.render(`/articles/${articleId}/view`, { error: 'Failed to create comment' });
    });
};

// Handle comment deletion
exports.deleteComment = (req, res) => {
  const  commentId  = req.params.id;
console.log('delete comment ', commentId)
  Comment.destroy({
    where: {
      id: commentId,
    },
  })
    .then(() => {
      res.redirect('back');
    })
    .catch((err) => {
      console.error(err);
      res.render('articles/view', { error: 'Failed to delete comment' });
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
  
  const commentId = req.params.id;
  console.log("commentId ",commentId);
  (async () => {
    try {
      const comment = await fetchCommentById(commentId);
      console.log("fetched comment ", comment);
      console.log("fetched commentId ", comment.id);

      res.render('articles/editComment', { hbsContent: hbsContent, comment: comment });
    } catch (error) {
      console.error('Error fetching comment:', error);
      res.render('articles/editComment', { hbsContent: hbsContent, comment: null });
    }
  })();
};

async function fetchCommentById(commentId) {
  try {
    const comment = await Comment.findByPk(commentId);
    return comment;
  } catch (error) {
    console.error('Error fetching comment by ID:', error);
    throw error;
  }
}


exports.editComment = (req, res) => {
  
  const { comment } = req.body;
  
  const commentId = req.params.id;

  Comment.update(
    { comment },
    { where: { id: commentId } }
  )
    .then(() => {

      (async () => {
        try {
          const articleId = await findArticleIdByCommentId(commentId);
      
          console.log("fetched articleId ", articleId);
    
          res.redirect(`/articles/${articleId}/view`);
        } catch (error) {
          console.error('Error fetching article:', error);
          res.redirect('back');
        }
      })();

   
    })
    .catch((error) => {
      console.error('Error updating comment:', error);
      res.render(`comment/edit/${commentId}`, { error: 'Failed to update comment' });
    });
  
};

async function findArticleIdByCommentId(commentId) {
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new Error('Comment not found');
    }
    const articleId = comment.articleId;
    return articleId;
  } catch (error) {
    console.error('Error finding articleId by commentId:', error);
    throw error;
  }
}
