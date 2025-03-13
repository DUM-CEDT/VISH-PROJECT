const express = require('express');
const { createYanTemplate , getYanTemplates , getYanTemplate } = require('../controllers/YanTemplate');
const router = express.Router();

router.route('/').post( createYanTemplate);
router.route('/').get( getYanTemplates);
router.route('/:id').get( getYanTemplate);

module.exports = router;