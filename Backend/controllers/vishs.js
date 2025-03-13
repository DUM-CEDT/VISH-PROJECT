const Vish = require('../models/Vish')
const mongoose = require('mongoose')
const VishTimeStamp = require ('../models/VishTimeStamp')

//@desc         Any thing about Merchandise

//@desc         Get All Vish With Pagination
//@route        GET /api/vish/getallvish/:page
//@access       Public
exports.getVishs = async (req , res, next) => {

    let query 

    let reqQuery = { ...req.query }
    const removeFields = ['page']
    removeFields.forEach((param) => delete reqQuery[param])

    let queryStr = JSON.stringify(reqQuery)

    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    )

    return res.status(200).json(req.query)
}

exports.addVishTimeStamp = async (req , res , next) => {

    try {
        await VishTimeStamp.insertOne({
            user_id : new mongoose.Types.ObjectId(),
            vish_id : new mongoose.Types.ObjectId(),
            point : 1
        })
    }
    catch (err) {
        console.log(err)
        if (err.statusCode == 400) {
            return res.status(400).json({success : false, msg : err.message})
        }
    }
    

    return res.status(200).json({})

}