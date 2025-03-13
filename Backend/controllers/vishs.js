const Vish = require('../models/Vish')
const mongoose = require('mongoose')
const VishTimeStamp = require ('../models/VishTimeStamp')
const User = require('../models/User')
const { updateUser } = require('../utils/updateUser')
const Transaction = require('../models/Transaction')


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
    const userId = req.user._id
    const {text, category_list, is_bon, bon_condition, bon_credit, distribution } = req.body

    const mongoose_session = await mongoose.startSession()
    mongoose_session.startTransaction()

    try {
        
        if (is_bon) {
            thisUser = await User.findById(userId)
            if (thisUser.credit < bon_credit) {
                return res.status(400).json({
                    success : false,
                    msg : "User credit is less than the credit of bon condition"
                })
            }
            
            thisUser = await updateUser({
                _id : userId,
                data : {
                    credit : thisUser.credit - bon_credit
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
            bon_credit,
            distribution,
        }, {session : mongoose_session})

        vishCreateDate = newVish.create_at

        createdTransaction = await Transaction.insertOne({
             user_id: userId, 
             amount: bon_credit, 
             trans_category: 'bon',
             created_at : vishCreateDate
        }, {session : mongoose_session});

        if (is_bon) {
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

    res.status(200).json({text : "OK"})
}

// createVishTimeStamp = async (userData) => {

//     try {
//         await VishTimeStamp.insertOne({
//             user_id : new mongoose.Types.ObjectId(),
//             vish_id : new mongoose.Types.ObjectId(),
//             point : 1
//         })
//     }
//     catch (err) {
//         console.log(err)
//         if (err.statusCode == 400) {
//             return res.status(400).json({success : false, msg : err.message})
//         }
//     }
    

//     return res.status(200).json({})

// }