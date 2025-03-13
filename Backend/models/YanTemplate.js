const mongoose = require('mongoose');

const YanTemplateSchema = new mongoose.Schema({
  yan_template_image_list: [{ 
    type : mongoose.Schema.Types.ObjectId,
    ref : 'YanTemplateImage',
    required: true
  }],
  yan_category: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'YanCategory',
    required: true
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

module.exports = mongoose.model('YanTemplate', YanTemplateSchema);