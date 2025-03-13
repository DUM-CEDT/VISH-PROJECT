const mongoose = require('mongoose');

const merchandiseTransactionSchema = new mongoose.Schema({
    merch_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Merchandise', 
        required: true 
    },
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true }, 
    selected_merch_prop: { 
        type: String, 
        required: true 
    },
    tel: { 
        type: String, 
        required: true 
    },
    address: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['รอจัดส่ง', 'จัดส่งแล้ว', 'ยกเลิก'], 
        default: 'รอจัดส่ง' }
});

merchandiseTransactionSchema.pre("validate", async function (next) {
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

module.exports = mongoose.model('MerchandiseTransaction', merchandiseTransactionSchema);