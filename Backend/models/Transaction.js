const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    trans_category: { 
        type: String, 
        enum: ['deposit', 'withdraw', 'reward', 'buyItems', 'refund'], 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

transactionSchema.pre("validate", async function (next) {
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

module.exports = mongoose.model('Transaction', transactionSchema);