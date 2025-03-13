const express = require('express');
const { createYanImage , updateYanImage , getYanImages } = require('../controllers/YanTemplateImage');
const router = express.Router();

router.route('/').post( createYanImage);
router.route('/:id').put( updateYanImage);
router.route('/:page').get( getYanImages);

module.exports = router;