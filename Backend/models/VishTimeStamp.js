const mongoose = require('mongoose')

const VishTimeStampSchema = new mongoose.Schema({
    user_id : {
        type : Number,
        required : true
    },
    vish_or_bon : {
        type : Boolean,
        required : true
    },
    vish_id : {
        type : Number,
        required : true
    },
    point : {
        type : Number,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now()
    }
})

modules.exports = mongoose.model('VishRimeStamp', VishTimeStampSchema)