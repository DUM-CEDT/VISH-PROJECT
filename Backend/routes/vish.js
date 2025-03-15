const express = require('express')
const {getVishs, createVishTimeStamp, createVish, vishVish, setVishSuccess, updateVish, deleteVish}= require('../controllers/vishs')

const router = express.Router()
const { protect } = require('../middleware/user');

router.route('/').get(getVishs)
router.route('/createvish').post(protect, createVish)
router.route('/vishVish').post(protect, vishVish)
router.route('/setvishsuccess').put(protect, setVishSuccess)
router.route('/updatevish', protect, updateVish)
router.route('/deletevish', protect, deleteVish)

module.exports = router
