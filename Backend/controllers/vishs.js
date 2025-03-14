const Vish = require('../models/Vish')
const mongoose = require('mongoose')
const VishTimeStamp = require ('../models/VishTimeStamp')
const User = require('../models/User')
const { updateUser } = require('../utils/updateUser')
const Transaction = require('../models/Transaction')


//@desc         Any thing about Vish

//@desc         Get All Vish With Pagination
//@route        GET /api/vish/getallvish/:page
//@access       Public
exports.getVishs = async (req , res, next) => {

    let query 

    let reqQuery = { ...req.query }
    const removeFields = ['page', 'type']

    removeFields.forEach((param) => delete reqQuery[param])

    if (type == 'popular') {

    }
    else if (type == 'latest') {

    }
    else if (type == 'myvish') {
        
    }

    return res.status(200).json(req.query)
}

//@desc         Create New Vish
//@route        POST /api/vish/createVish/
//@access       Private
exports.createVish = async (req , res , next) => {

    const userId = req.user._id
    const {text, category_list, is_bon, bon_condition, bon_vish_target, bon_credit, distribution } = req.body
    const mongoose_session = await mongoose.startSession()
    thisUser = req.user
    mongoose_session.startTransaction()
    
    if (!thisUser) {
        mongoose_session.endSession()
        return res.status(404).json({
            success : false,
            msg : `No user with id : ${userId}`
        })
    }

    try {

        const oneDayAgo = new Date();
        oneDayAgo.setHours(oneDayAgo.getHours() - 24); 
        
        const createdVishInOneDay = await Vish.countDocuments({user_id : userId, create_at : {$gte : oneDayAgo}})
        if ((thisUser.premium && createdVishInOneDay >= 3) || (!thisUser.premium && createdVishInOneDay >= 1)) {
            mongoose_session.endSession()
            return res.status(400).json({
                success : false,
                msg : "Reach Day Vish Create Limit"
            })
        }

        if (is_bon) {

            if (bon_condition == true && distribution > bon_vish_target) {
                return res.status(400).json({
                    success : false,
                    msg : "Distribution can't greater than Vish Target"
                })
            }

            total_credit = (bon_credit *distribution)

            if (thisUser.credit < total_credit) {
                return res.status(400).json({
                    success : false,
                    msg : "User credit is less than the credit of bon condition"
                })
            }
            
            thisUser = await updateUser({
                _id : userId,
                data : {
                    credit : thisUser.credit - total_credit
                },
                session : mongoose_session
            })
            
        }


        newVish = await Vish.insertOne({
            user_id : userId,
            text,
            category_list,
            is_bon,
            bon_condition,
            bon_vish_target : (is_bon == true && bon_condition == true) ? bon_vish_target : 0,
            bon_credit : is_bon == false ? 0 : bon_credit,
            distribution : is_bon == false ? 1 : distribution,
        }, {session : mongoose_session})

        vishCreateDate = newVish.create_at

        if (is_bon) {
            createdTransaction = await Transaction.insertOne({
                 user_id: userId, 
                 amount: total_credit, 
                 trans_category: 'bon',
                 created_at : vishCreateDate
            }, {session : mongoose_session})

            newTimeStamp = new VishTimeStamp({
                vish_id : newVish._id,
                user_id : userId,
                status : false,
                point : 10,
                timestamp : vishCreateDate
            })

            newTimeStamp.$session(mongoose_session)
            newTimeStamp = await newTimeStamp.save()
            
        }

        await mongoose_session.commitTransaction()
    }
    catch (err) {
        await mongoose_session.abortTransaction();
        mongoose_session.endSession()
        return res.status(400).json({
            success : false, msg : err.message
        })
    }
    mongoose_session.endSession()

    res.status(200).json({success : true, vish : newVish})
}

exports.vishVish = async (req , res , next) => {
    
    const vishId = req.body.vish_id
    const mongoose_session = await mongoose.startSession()

    try {

        const isThisUserAlreadyVish = await VishTimeStamp.exists(
            {   
                vish_id : vishId, 
                user_id : req.user._id,
                status : true,
                point : 1
        });

        mongoose_session.startTransaction()

        let cnt = 0
        if (isThisUserAlreadyVish) {
            
            cnt = -1

            const removeVishTimeStamp = await VishTimeStamp.findOneAndDelete({
                vish_id : vishId,
                user_id : req.user._id,
                status : true,
                point : 1
            }, {new : true,session : mongoose_session})

        }
        else { // Not Already Like

            cnt = 1

            const insertVishTimeStamp = await VishTimeStamp.insertOne({
                vish_id : vishId,
                user_id : req.user._id,
                status : true,
                point : 1,
            }, {new : true, session : mongoose_session})

        }

        const updateVish = await Vish.findByIdAndUpdate(vishId, {$inc : {vish_count : cnt}}, {new : true, session : mongoose_session})
        
        if (updateVish.is_bon == true && updateVish.bon_condition == true && updateVish.vish_count >= updateVish.bon_vish_target) {
            // is success = true is in the credit distribution code 
            console.log("Reach Target")
            // distribute credit

        }

        await mongoose_session.commitTransaction()
        mongoose_session.endSession()

        return res.status(200).json({
            success : true,
            vish : updateVish
        })

    }
    catch(err) {

        await mongoose_session.abortTransaction();
        mongoose_session.endSession()

        return res.status(400).json({
            success : false,
            msg : err.message
        })
    }


}

exports.setVishSuccess = async (req , res , next) => {

    const userId = req.user._id
    const vishId = req.body.vish_id

    // Check is this vish already success

    try {

    }
    catch (err) {
        return res.status(400).json({
            success : false,
            msg : err.message
        })
    }


}


