const Vish = require('../models/Vish')
const mongoose = require('mongoose')
const VishTimeStamp = require ('../models/VishTimeStamp')
const User = require('../models/User')

//@desc         Any thing about Merchandise

//@desc         Get All Vish With Pagination
//@route        GET /api/vish/getallvish/:page
//@access       Public
exports.getVishs = async (req , res, next) => {

    let query 

    let reqQuery = { ...req.query }
    const removeFields = ['page', 'type']

    removeFields.forEach((param) => delete reqQuery[param])

    return res.status(200).json(req.query)
}

exports.createVish = async (req , res , next) => {
    const user_id = req.body.user_id
    const {text, category_list, vish_count, is_bon, bon_condition, bon_point, distribution, is_success, report_count } = req.body
    
    try {

        if (is_bon) {

            user_data = await User.findById(user_id)

            if (bon_condition == true) { // use like
                
            }
            else { // use success

            }
        }



        newVish = await Vish.insertOne({
            user_id,
            text,
            category_list,
            vish_count,
            is_bon,
            bon_condition,
            bon_point,
            distribution,
            is_success,
            report_count
        })
    }
    catch (err) {
        return res.status(400).json({
            success : false, msg : err.message
        })
    }
    res.status(200).json({text : "OK"})
}

exports.createVishTimeStamp = async (req , res , next) => {

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