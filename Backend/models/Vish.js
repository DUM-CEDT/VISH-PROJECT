const mongoose = require('mongoose');
const { validate } = require('./YanTemplateImage');

const VishSchema = new mongoose.Schema({
    vish_id : {
        type : Number,
        required : true,
        unique : true
    },
    user_id : {
        type : Number,
        required : true
    },
    text : {
        type : String,
        required : true
    },
    category_list : {
        type : [Number],
        required : true,
        validate : v => v.length >= 1
    },
    vish_count : {
        type : Number,
        required : true
    },
    create_at : {
        type : Date,
        default : Date.now()
    },
    is_bon : {
        type : Boolean,
        required : true
    },
    bon_condition : {
        type : Number
    },
    bon_point : {
        type : Number
    },
    distribution : {
        type : Number
    },
    is_success : {
        type : Boolean
    },
    report_count : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Vish', VishSchema)