const express = require('express');
const { createYanTemplate , getYanTemplates , getYanTemplate , deleteYanTemplate, downloadYanTemplate } = require('../controllers/YanTemplate');
const { authorize , protect } = require('../middleware/user');
const router = express.Router();

router.route('/').post(protect, createYanTemplate);
router.route('/').get( getYanTemplates);
router.route('/:id').get( getYanTemplate);
router.route('/:id').delete(protect,authorize("admin"), deleteYanTemplate);
router.route('/download/:id').get(protect,downloadYanTemplate);

module.exports = router;