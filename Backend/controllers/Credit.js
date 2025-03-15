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
      { $group: { _id: '$user_id', userPoints: { $sum: '$point' } } },
      {$sort : {_id : 1}}
    ]);

    let cummuArray = userPointsAgg.map(item => item.userPoints)
    let userIdArray = userPointsAgg.map(item => item._id)

    for (let i = 1 ; i <cummuArray.length ; i++) {
      cummuArray[i] = cummuArray[i - 1] + cummuArray[i]
    }

    let sum = cummuArray[cummuArray.length - 1]

    total_credit = distributed
    
    const rewardMapping = {}

    for (let i = 0 ; i < distributed ; i++) {
      random01 = Math.random()
      randomRange = random01 * sum
      ceilRandomRange = Math.ceil(randomRange)
      // console.log(ceilRandomRange)

      let left = 0, right = cummuArray.length - 1;
    
      while (left < right) {
          let mid = Math.floor((left + right) / 2);
          if (cummuArray[mid] < ceilRandomRange) {
              left = mid + 1;  // Move right if target is greater or equal
          } else {
              right = mid;  // Keep searching in the left half
          }
      }

      if (!rewardMapping[left])
        rewardMapping[left] = 1
      else
        rewardMapping[left] += 1

    }

    
    let updateArray = []
    
    for (const key of Object.keys(rewardMapping)) {

      updateArray.push({
        updateOne : {
          filter : {
            _id : userIdArray[parseInt(key)]
          },
          update : {
            $inc : {credit : rewardMapping[key]}
          }
        }
      })
    }


    let updateMany = await User.bulkWrite(updateArray)

    


    // ดึงผู้ใช้ทั้งหมด ยกเว้นผู้ใช้ที่ถอน (เพื่อป้องกันการแจกให้ตัวเอง)
    // const users = await User.find({ _id: { $ne: user._id } }).session(session);
    // if (users.length === 0) {
    //   const receivedBaht = amount * 0.5;
    //   await session.commitTransaction();
    //   return res.json({
    //     success: true,
    //     remaining_credits: user.credit,
    //     received_baht: receivedBaht,
    //     distributed_baht: 0,
    //     distributed_users: []
    //   });
    // }

    return res.status(200).json({arr : updateMany})


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