const express = require('express')
const {getVishs, createVishTimeStamp, createVish}= require('../controllers/vishs')

const router = express.Router()

router.route('/').get(getVishs)
router.route('/createvish').post(createVish)
router.route('/createvishtimestamp').post(createVishTimeStamp)

module.exports = router
