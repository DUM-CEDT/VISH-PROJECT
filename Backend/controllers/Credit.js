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
        await Transaction.create({ user_id: userToUpdate._id, amount: 1, trans_category: 'reward' });
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

// exports.reward = async (req, res) => {
//   try {
//     const { vish_id } = req.body;
//     if (!mongoose.Types.ObjectId.isValid(vish_id)) {
//       return res.status(400).json({ success: false, message: 'Invalid Vish ID' });
//     }

//     const vish = await Vish.findById(vish_id);
//     if (!vish) {
//       return res.status(404).json({ success: false, message: 'Vish not found' });
//     }
//     if (!vish.is_bon) {
//       return res.status(400).json({ success: false, message: 'This Vish is not a Bon' });
//     }

//     // ตรวจสอบเงื่อนไขตาม bon_condition
//     if (vish.bon_condition === false) { // Success: ต้องให้ผู้โพสกดเปลี่ยน is_success
//       if (!vish.is_success) {
//         return res.status(403).json({ success: false, message: 'Only the poster can mark this Vish as successful' });
//       }
//       // ตรวจสอบว่าเป็นผู้โพส
//       if (vish.user_id.toString() !== req.user.user_id.toString()) {
//         return res.status(403).json({ success: false, message: 'Only the poster can trigger reward for success condition' });
//       }
//     } else if (vish.bon_condition === true) { // Like: ตรวจสอบ vish_count กับ bon_vish_target
//       if (vish.vish_count < vish.bon_vish_target) {
//         return res.status(400).json({ success: false, message: `Vish count (${vish.vish_count}) must reach ${vish.bon_vish_target} to distribute rewards` });
//       }
//       // อัปเดต is_success ถ้ายังไม่สำเร็จ
//       if (!vish.is_success) {
//         vish.is_success = true;
//         await vish.save();
//       }
//     }

//     // ป้องกันการแจกซ้ำ
//     if (vish.is_success && vish.bon_condition === true) {
//       return res.status(400).json({ success: false, message: 'This Vish has already been rewarded' });
//     }

//     // ดึงรายชื่อผู้ใช้ที่กด Vish
//     const vishTimestamps = await VishTimeStamp.find({ vish_id, status: true });
//     if (vishTimestamps.length === 0) {
//       return res.status(400).json({ success: false, message: 'No users have Vished this post' });
//     }

//     const vishers = vishTimestamps.map(ts => ts.user_id.toString());
//     const uniqueVishers = [...new Set(vishers)];

//     // คำนวณจำนวน Credit ต่อคน
//     const creditsPerUser = Math.floor(vish.bon_credit / vish.distribution);
//     const remainingCredits = vish.bon_credit % vish.distribution; // ส่วนที่เหลือ
//     if (creditsPerUser <= 0) {
//       return res.status(400).json({ success: false, message: 'Invalid distribution or bon_credit' });
//     }

//     // ตรวจสอบจำนวนผู้ใช้ที่เพียงพอ
//     if (uniqueVishers.length < vish.distribution) {
//       return res.status(400).json({ success: false, message: 'Not enough users to distribute rewards' });
//     }

//     // สุ่มเลือกผู้ใช้
//     const shuffledVishers = uniqueVishers.sort(() => 0.5 - Math.random());
//     const selectedVishers = shuffledVishers.slice(0, vish.distribution);

//     // แจก Credit
//     const updatedUsers = [];
//     for (let i = 0; i < selectedVishers.length; i++) {
//       const userId = selectedVishers[i];
//       const userToUpdate = await User.findById(userId);
//       if (userToUpdate) {
//         const creditsToAdd = creditsPerUser + (i === selectedVishers.length - 1 ? remainingCredits : 0);
//         userToUpdate.credit += creditsToAdd;
//         await userToUpdate.save();
//         updatedUsers.push({ user_id: userToUpdate._id, credits_added: creditsToAdd });
//         await Transaction.create({ 
//           user_id: userToUpdate._id, 
//           amount: creditsToAdd, 
//           trans_category: 'reward' 
//         });
//       }
//     }

//     res.json({ 
//       success: true, 
//       distributed_credits: creditsPerUser,
//       distributed_users: updatedUsers.map(u => ({ user_id: u._id, credits_added: creditsPerUser }))
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// exports.buyItems = async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const _id = req.params.item_id;
//     if (!mongoose.Types.ObjectId.isValid(_id) || !quantity || quantity <= 0) {
//       return res.status(400).json({ success: false, message: 'Invalid data' });
//     }

//     const user = await User.findById(req.user.user_id);
//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     const item = { price: 10 }; // เปลี่ยนเป็น Merchandise.findById(_id) เมื่อมี Model
//     if (!item) return res.status(404).json({ success: false, message: 'Item not found' });

//     const totalCost = item.price * quantity;
//     if (user.credit < totalCost) return res.status(400).json({ success: false, message: 'Insufficient credits' });

//     user.credit -= totalCost;
//     await user.save();

//     const transaction = await Transaction.create({ user_id: user._id, amount: -totalCost, trans_category: 'buyItems' });
//     res.json({ success: true, remain_credits: user.credit, order_id: transaction._id });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };