
const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');


router.get('/:id/view', articlesController.viewForm);

router.get('/create', articlesController.createForm);
router.post('/create', articlesController.createArticle);

router.get('/:id/edit', articlesController.editForm);
router.post('/:id/edit', articlesController.editArticle);

router.get('/:id/delete', articlesController.deleteArticle);

module.exports = router;
