const mongoose = require('mongoose');

const merchandiseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
    price: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String,
        required: true 
    },
    merch_props: {
        type: [
          {
            type: {
              type: String,
              required: true
            },
            options: {
              type: [String],
              required: true
            }
          }
        ],
        required: true,
        default: []
      },
    description: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Merchandise', merchandiseSchema);