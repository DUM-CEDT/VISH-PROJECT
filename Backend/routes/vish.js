const express = require('express')
const {getVishs, createVishTimeStamp, createVish, vishVish}= require('../controllers/vishs')

const router = express.Router()
const { protect } = require('../middleware/user');

router.route('/').get(getVishs)
router.route('/createvish').post(protect, createVish)
router.route('/vishVish').post(protect, vishVish)
module.exports = router
