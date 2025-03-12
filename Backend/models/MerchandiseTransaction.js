const mongoose = require('mongoose');

const merchandiseTransactionSchema = new mongoose.Schema({
  merch_id: { type: Number, required: true },
  user_id: { type: Number, required: true }, 
  selected_merch_prop: { type: String, required: true },
  tel: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['รอจัดส่ง', 'จัดส่งแล้ว','ยกเลิก'], default: 'รอจัดส่ง' }
});

module.exports = mongoose.model('MerchandiseTransaction', merchandiseTransactionSchema);