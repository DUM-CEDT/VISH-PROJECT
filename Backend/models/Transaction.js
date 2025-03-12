const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    trans_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    user_id: { 
        type: Number, 
        required: true 
    },
    amount: { 
        type: Number, 
        required: true 
    },
    trans_category: { 
        type: String, 
        enum: ['deposit', 'withdraw', 'reward', 'buyItems'], 
        required: true 
    },
    created_at: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);