const mongoose = require('mongoose');
const Vish = require('../models/Vish');
const VishTimeStamp = require('../models/VishTimeStamp');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const rewardUtil = async (vishId, userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(vishId)) {
      throw new Error('Invalid Vish ID');
    }

    const vish = await Vish.findById(vishId);
    if (!vish) {
      throw new Error('Vish not found');
    }
    if (!vish.is_bon) {
      throw new Error('This Vish is not a Bon');
    }

    // ถ้า is_success เป็น true อยู่แล้วปัดทิ้ง
    if (vish.is_success) {
      throw new Error('This Vish has already been rewarded');
    }

    // ตรวจสอบเงื่อนไขตาม bon_condition
    if (vish.bon_condition === false) {
      if (vish.user_id.toString() !== userId.toString()) {
        throw new Error('Only the poster can trigger reward for success condition');
      }
    } else if (vish.bon_condition === true) {
      if (vish.vish_count < vish.bon_vish_target) {
        throw new Error(`Vish count (${vish.vish_count}) must reach ${vish.bon_vish_target} to distribute rewards`);
      }
    }
 // Visit this agiain later naja
    const vishTimestamps = await VishTimeStamp.find({ vish_id: vishId, status: true });
    if (vishTimestamps.length === 0) {
      throw new Error('No users have Vished this post');
    }

    const vishers = vishTimestamps.map(ts => ts.user_id.toString());
    const uniqueVishers = [...new Set(vishers)];

    if (uniqueVishers.length < vish.distribution) {
      throw new Error('Not enough users to distribute rewards');
    }

    const creditsPerUser = vish.bon_credit;
    if (creditsPerUser <= 0) {
      throw new Error('Invalid bon_credit');
    }

    const shuffledVishers = [...uniqueVishers];
    for (let i = shuffledVishers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledVishers[i], shuffledVishers[j]] = [shuffledVishers[j], shuffledVishers[i]];
    }
    const selectedVishers = shuffledVishers.slice(0, vish.distribution);
    
    const updatedUsers = [];
    for (let i = 0; i < selectedVishers.length; i++) {
      const userId = selectedVishers[i];
      const userToUpdate = await User.findById(userId);
      if (userToUpdate) {
        userToUpdate.credit += creditsPerUser;
        await userToUpdate.save();
        await Transaction.create({
          user_id: userToUpdate._id,
          amount: creditsPerUser,
          trans_category: 'reward'
        });
        updatedUsers.push({ user_id: userToUpdate._id, credits_added: creditsPerUser });
      }
    }

    // ตั้งค่า is_success เป็น true หลังจากแจก Reward เสร็จในทุกกรณี
    vish.is_success = true;
    await vish.save();

    return {
      success: true,
      distributed_credits: creditsPerUser,
      distributed_users: updatedUsers.map(u => ({ user_id: u.user_id, credits_added: u.credits_added }))
    };
  } catch (err) {
    throw err;
  }
};

module.exports = rewardUtil;