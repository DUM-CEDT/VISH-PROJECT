const mongoose = require('mongoose');

const YanTemplateImageSchema = new mongoose.Schema({
  yan_template_image_set_id: { 
    type: Number, 
    required: true,   
  },
  yan_category: [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref : 'YanCategory',
    required: true
  }],
  yan_level: { 
    type: Number, 
    enum: [0,1,2,3], 
    required: true 
  },
  yan_image_base64: { 
    type: String ,
    required: true
  },
});

module.exports = mongoose.model('YanTemplateImage', YanTemplateImageSchema);