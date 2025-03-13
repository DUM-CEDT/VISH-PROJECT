const express = require('express');
const { createYanImage , updateYanImage , getYanImages , getYanImage , deleteYanImage } = require('../controllers/YanTemplateImage');
const router = express.Router();

router.route('/').post( createYanImage);
router.route('/:id').put( updateYanImage);
router.route('/').get( getYanImages);
router.route('/:id').get( getYanImage);
router.route('/:id').delete( deleteYanImage);

module.exports = router;