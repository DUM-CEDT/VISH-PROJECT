const express = require('express')
const {getVishs, addVishTimeStamp}= require('../controllers/vishs')

const router = express.Router()

router.route('/').get(getVishs)
router.route('/addvishtimestamp').post(addVishTimeStamp)

module.exports = router
