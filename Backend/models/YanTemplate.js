const mongoose = require('mongoose');
const Category = require('./Category');

const YanTemplateSchema = new mongoose.Schema({
  yan_category: [{
    type : mongoose.Schema.ObjectId,
    ref : 'Category'
  }],
  yan_template_image_list: [{ 
    type : mongoose.Schema.ObjectId, 
    required : true,
    ref : 'YanTemplateImage',
    validate : v => v.length == 4
  }],
  background_color: { 
    type: String, 
    required: true,
    match: /^#([0-9A-F]{3}|[0-9A-F]{6})$/i
  },
  export_count: { 
    type: Number, 
    default: 0
  }
});

YanTemplateSchema.pre("validate", async function (next) {
  try {
    
    yan_image_list_not_null = this.yan_template_image_list.filter(image => image !== null);
    const existingImageCount = await YanTemplateImage.countDocuments({ _id: { $in: this.yan_image_list_not_null} });


    if (existingImageCount !== this.yan_image_list_not_null.length) {
      const error = new Error("One or more Image IDs do not exist.");
      error.statusCode = 400;
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
});

YanTemplateSchema.pre("validate", async function (next) {
  try {
      
    const existingCategoryCount = await Category.countDocuments({ _id: { $in: this.yan_cateogry} });

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

module.exports = mongoose.model('YanTemplate', YanTemplateSchema);