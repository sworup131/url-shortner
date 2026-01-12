const express = require('express');
const { handleGenerateNewShortUrl,handleGetAnalysis } = require('../controllers/url');
const router = express.Router();

router.post('/',handleGenerateNewShortUrl)
router.get('/:shortid',handleGetAnalysis)

module.exports = router;