const express = require('express');
const { createYanTemplate } = require('../controllers/YanTemplate');
const router = express.Router();

router.route('/').post( createYanTemplate);

module.exports = router;