const mongoose = require('mongoose');

const yanTemplateSchema = new mongoose.Schema({
  yan_template_id: { type: Number, required: true },
  yan_template: [{ type : Number, enum: [0,1,2,3]}],
  yan_cateogry: [{type : Number}],
  background: { type: String, required: true},
  export_count: { type: Number , default: 0}
});

module.exports = mongoose.model('ํYanTemplate', yanTemplateSchema);