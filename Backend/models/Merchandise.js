const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
    merch_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    image: { 
        type: String,
        required: true 
    },
    merch_prop: { 
        type: [String],
        required: true, 
        validate: v => v.length >= 1 
    },
    description: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Merchandise', merchandiseSchema);