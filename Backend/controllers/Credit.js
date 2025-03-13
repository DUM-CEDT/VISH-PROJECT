const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Merchandise = require('../models/Merchandise');
const VishTimeStamp = require('../models/VishTimeStamp');

exports.deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });

    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    user.credit += amount;
    await user.save();

    await Transaction.create({ user_id: user._id, amount, trans_category: 'deposit' });
    res.json({ success: true, total_credits: user.credit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: 'Invalid amount' });

    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const totalDeduction = amount;
    const distributed = Math.floor(amount * 0.25);

    if (user.credit < totalDeduction) return res.status(400).json({ success: false, message: 'Insufficient credits' });

    user.credit -= totalDeduction;
    await user.save();

    await Transaction.create({ user_id: user._id, amount: -totalDeduction, trans_category: 'withdraw' });

    const users = await User.find();
    const share = distributed > 0 && users.length > 0 ? Math.floor(distributed / users.length) : 0;
    for (const u of users) {
      u.credit += share;
      await u.save();
      await Transaction.create({ user_id: u._id, amount: share, trans_category: 'reward' });
    }

    res.json({ success: true, remaining_credits: user.credit, received: amount, distributed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.reward = async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const timestamps = await VishTimeStamp.find({ user_id: user._id });
    const totalPoints = timestamps.reduce((sum, ts) => sum + ts.point, 0);
    const allTimestamps = await VishTimeStamp.find();
    const globalPoints = allTimestamps.reduce((sum, ts) => sum + ts.point, 0);

    const probability = globalPoints > 0 ? totalPoints / globalPoints : 0;
    let creditsAdded = 0;
    if (Math.random() < probability) {
      creditsAdded = 1;
      user.credit += creditsAdded;
      await user.save();
      await Transaction.create({ user_id: user._id, amount: creditsAdded, trans_category: 'reward' });
    }

    res.json({ success: true, credits_added: creditsAdded, total_credits: user.credit });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.buyItems = async (req, res) => {
  try {
    const { quantity } = req.body;
    const _id = req.params.item_id; // รับจาก Route และตั้งชื่อเป็น _id
    if (!mongoose.Types.ObjectId.isValid(_id) || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    const item = await Merchandise.findById(_id); // ใช้ _id เพื่อค้นหา Merchandise
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

    const totalCost = item.price * quantity;
    if (user.credit < totalCost) return res.status(400).json({ success: false, message: 'Insufficient credits' });

    user.credit -= totalCost;
    await user.save();

    const transaction = await Transaction.create({ user_id: user._id, amount: -totalCost, trans_category: 'buyItems' });
    res.json({ success: true, remain_credits: user.credit, order_id: transaction._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};