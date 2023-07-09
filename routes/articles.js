// routes/articles.js
const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articlesController');

// Article creation routes
router.get('/create', articlesController.createForm);
router.post('/create', articlesController.createArticle);

module.exports = router;
