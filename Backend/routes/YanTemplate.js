const express = require('express');
const { createYanTemplate , getYanTemplates , getYanTemplate , deleteYanTemplate } = require('../controllers/YanTemplate');
const { authorize , protect } = require('../middleware/user');
const router = express.Router();

router.route('/').post( createYanTemplate);
router.route('/').get( getYanTemplates);
router.route('/:id').get( getYanTemplate);
router.route('/:id').delete(protect,authorize("admin"), deleteYanTemplate);

module.exports = router;