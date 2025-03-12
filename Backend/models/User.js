const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  google_account_token: { type: String },
  google_account_auth_code: { type: String },
  google_account_refresh_token: { type: String },
  password: { type: String, required: true },
  credit: { type: Number, default: 0 },
  premium: { type: Boolean, default: false },
  vish_count: { type: Number, default: 0 },
  yan_template_id: [{ type: Number }],
  vish_list: [{ type: Number }],
  vished_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);