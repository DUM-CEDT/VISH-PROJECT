const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const VishTimeStamp = require('../models/VishTimeStamp');
const Vish = require('../models/Vish');

exports.deposit = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      throw new Error('Invalid amount');
    }

    const user = await User.findById(req.user._id).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    user.credit += amount;
    await user.save({ session });

    await Transaction.create(
      [{ user_id: user._id, amount, trans_category: 'deposit' }],
      { session }
    );

    await session.commitTransaction();
    res.json({ success: true, total_credits: user.credit });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

exports.withdraw = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { amount } = req.body;
    if (!amount || amount < 0) {
      throw new Error('Invalid amount');
    }
    if (amount < 100) {
      throw new Error('Minimum withdrawal is 100 credits');
    }

    const user = await User.findById(req.user._id).session(session);
    if (!user) {
      throw new Error('User not found');
    }

    const totalDeduction = amount;
    const distributed = Math.floor(amount * 0.25);

    if (user.credit < totalDeduction) {
      throw new Error('Insufficient credits');
    }

    user.credit -= totalDeduction;
    await user.save({ session });

    await Transaction.create(
      [{ user_id: user._id, amount: -totalDeduction, trans_category: 'withdraw' }],
      { session }
    );

    // คำนวณโอกาสแจก Credit ด้วย Aggregation
    const globalPointsAgg = await VishTimeStamp.aggregate([
      { $group: { _id: null, totalPoints: { $sum: '$point' } } }
    ]);
    const globalPoints = globalPointsAgg.length > 0 ? globalPointsAgg[0].totalPoints : 0;

    const userPointsAgg = await VishTimeStamp.aggregate([
      { $group: { _id: '$user_id', userPoints: { $sum: '$point' } } }
    ]);

    // ดึงผู้ใช้ทั้งหมด ยกเว้นผู้ใช้ที่ถอน (เพื่อป้องกันการแจกให้ตัวเอง)
    const users = await User.find({ _id: { $ne: user._id } }).session(session);
    if (users.length === 0) {
      const receivedBaht = amount * 0.5;
      await session.commitTransaction();
      return res.json({
        success: true,
        remaining_credits: user.credit,
        received_baht: receivedBaht,
        distributed_baht: 0,
        distributed_users: []
      });
    }

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
        await userToUpdate.save({ session });
        updatedUsers.push(userToUpdate);
        await Transaction.create(
          [{ user_id: userToUpdate._id, amount: 1, trans_category: 'reward-withdraw' }],
          { session }
        );
        remainingCreditsToDistribute -= 1;
      } else {
        break;
      }
    }

    const receivedBaht = amount * 0.5;
    const distributedBaht = (distributed - remainingCreditsToDistribute) * 0.5;

    await session.commitTransaction();
    res.json({
      success: true,
      remaining_credits: user.credit,
      received_baht: receivedBaht,
      distributed_baht: distributedBaht,
      distributed_users: updatedUsers.map(u => ({ user_id: u._id, credits_added: 1 }))
    });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};