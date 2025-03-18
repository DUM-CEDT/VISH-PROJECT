const express = require('express');
const { createYanTemplate , getYanTemplates , getYanTemplate , deleteYanTemplate, downloadYanTemplate, calculateYanLayers} = require('../controllers/YanTemplate');
const { authorize , protect } = require('../middleware/user');
const router = express.Router();

router.route('/').post( createYanTemplate);
router.route('/').get( getYanTemplates);
router.route('/:id').get( getYanTemplate);
router.route('/:id').delete(protect,authorize("admin"), deleteYanTemplate);
router.route('/download/:id').get(downloadYanTemplate);
router.post('/calculate-yan-layers', protect, calculateYanLayers);

module.exports = router;