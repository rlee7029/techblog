
const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/commentsController');

router.post('/:articleId/create', commentsController.createComment);
router.get('/:id/delete', commentsController.deleteComment);
router.get('/:id/edit', commentsController.editForm);
router.post('/:id/edit', commentsController.editComment);


module.exports = router;
