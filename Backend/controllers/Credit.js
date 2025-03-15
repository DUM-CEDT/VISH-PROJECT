const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const VishTimeStamp = require('../models/VishTimeStamp');
const Vish = require('../models/Vish');

exports.deposit = async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

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
    if (!amount || amount < 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }
    if (amount < 100) {
      return res.status(400).json({ success: false, message: 'Minimum withdrawal is 100 credits' });
    }

    const user = await User.findById(req.user.user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const totalDeduction = amount;
    const distributed = Math.floor(amount * 0.25);

    if (user.credit < totalDeduction) {
      return res.status(400).json({ success: false, message: 'Insufficient credits' });
    }

    user.credit -= totalDeduction;
    await user.save();

    await Transaction.create({ user_id: user._id, amount: -totalDeduction, trans_category: 'withdraw' });

    // คำนวณโอกาสแจก Credit ด้วย Aggregation เพื่อเพิ่มประสิทธิภาพ
    const globalPointsAgg = await VishTimeStamp.aggregate([
      { $group: { _id: null, totalPoints: { $sum: '$point' } } }
    ]);
    const globalPoints = globalPointsAgg.length > 0 ? globalPointsAgg[0].totalPoints : 0;

    const userPointsAgg = await VishTimeStamp.aggregate([
      { $group: { _id: '$user_id', userPoints: { $sum: '$point' } } }
    ]);

    const users = await User.find();
    const userProbabilities = await Promise.all(users.map(async (u) => {
      const userPointsEntry = userPointsAgg.find(up => up._id.toString() === u._id.toString());
      const userPoints = userPointsEntry ? userPointsEntry.userPoints : 0;
      const probability = globalPoints > 0 ? userPoints / globalPoints : 0;
      return { user: u, probability };
    }));

    const totalProbability = userProbabilities.reduce((sum, u) => sum + u.probability, 0);
    userProbabilities.forEach(u => {
      u.probability = totalProbability > 0 ? u.probability / totalProbability : 1 / users.length;
    });

    let remainingCreditsToDistribute = distributed;
    const updatedUsers = [];

    while (remainingCreditsToDistribute > 0) {
      const random = Math.random();
      let cumulativeProb = 0;
      const selectedUser = userProbabilities.find(({ probability }) => {
        cumulativeProb += probability;
        return random <= cumulativeProb;
      });

      if (selectedUser) {
        const userToUpdate = selectedUser.user;
        userToUpdate.credit += 1;
        await userToUpdate.save();
        updatedUsers.push(userToUpdate);
        await Transaction.create({ user_id: userToUpdate._id, amount: 1, trans_category: 'reward-withdraw' });
        remainingCreditsToDistribute -= 1;
      } else {
        break;
      }
    }

    const receivedBaht = amount * 0.5;
    const distributedBaht = (distributed - remainingCreditsToDistribute) * 0.5;

    res.json({ 
      success: true, 
      remaining_credits: user.credit,
      received_baht: receivedBaht,
      distributed_baht: distributedBaht,
      distributed_users: updatedUsers.map(u => ({ user_id: u._id, credits_added: 1 }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
