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

module.exports = mongoose.model('Transaction', transactionSchema);