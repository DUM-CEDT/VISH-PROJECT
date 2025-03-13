const mongoose = require('mongoose');
const { validate } = require('./YanTemplateImage');
const Category = require('./Category');
const User = require('./User')

const VishSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    text : {
        type : String,
        required : true
    },
    category_list : {
        type : [mongoose.Schema.ObjectId],
        ref : "Category",
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

VishSchema.pre("validate", async function (next) {
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

VishSchema.pre("validate", async function (next) {
    try {
        
      const existingCategoryCount = await Category.countDocuments({ _id: { $in: this.category_list } });
  
      if (existingCategoryCount !== this.category_list.length) {
        const error = new Error("One or more Category IDs do not exist.");
        error.statusCode = 400;
        return next(error);
      }
  
      next();
    } catch (error) {
      next(error);
    }
  });


module.exports = mongoose.model('Vish', VishSchema)