const mongoose = require('mongoose')
const User = require('./User')
const Vish = require('./Vish')
const Category = require('./Category')

const VishTimeStampSchema = new mongoose.Schema({
    vish_id : {
        type : mongoose.Schema.ObjectId,
        ref : "Vish",
        required : true
    },
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    status : {
        type : Boolean, // true : กด like vish, false : สร้าง bon
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


VishTimeStampSchema.pre("validate", async function (next) {
    try {
      const userExists = await User.exists({ _id: this.user_id });
      
      if (!userExists) {
        const error = new Error(`No User with ID ${this.user_id}`);
        error.statusCode = 400; 
        return next(error);
      }
  
      next();
    } catch (error) {
      next(error);
    }
});

VishTimeStampSchema.pre("validate", async function (next) {
    try {
      const vishExists = await Vish.exists({ _id: this.vish_id });
      
      if (!userExists) {
        const error = new Error(`No Vish with ID ${this.vish_id}`);
        error.statusCode = 400; 
        return next(error);
      }
  
      next();
    } catch (error) {
      next(error);
    }
});

module.exports = mongoose.model('VishTimeStamp', VishTimeStampSchema)