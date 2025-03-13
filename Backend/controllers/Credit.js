const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');
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
    const distributed = Math.floor(amount * 0.25); // 25% ของจำนวนที่ถอน

    if (user.credit < totalDeduction) return res.status(400).json({ success: false, message: 'Insufficient credits' });

    user.credit -= totalDeduction;
    await user.save();

    await Transaction.create({ user_id: user._id, amount: -totalDeduction, trans_category: 'withdraw' });

    const users = await User.find();
    const totalUsers = users.length;

    // ดึงข้อมูล VishTimeStamp ทั้งหมด
    const allTimestamps = await VishTimeStamp.find();
    const globalPoints = allTimestamps.reduce((sum, ts) => sum + ts.point, 0); // point ทั้งหมดในระบบ

    // คำนวณโอกาสสำหรับแต่ละผู้ใช้ตามสมการ P(credit)
    const userProbabilities = await Promise.all(users.map(async (u) => {
      const timestamps = await VishTimeStamp.find({ user_id: u._id });
      const userPoints = timestamps.reduce((sum, ts) => sum + ts.point, 0); // point จากการบน + การ Vish
      const probability = globalPoints > 0 ? userPoints / globalPoints : 0;
      return { user: u, probability };
    }));

    // Normalize โอกาสให้รวมกันเท่ากับ 1
    const totalProbability = userProbabilities.reduce((sum, u) => sum + u.probability, 0);
    userProbabilities.forEach(u => {
      u.probability = totalProbability > 0 ? u.probability / totalProbability : 1 / totalUsers; // ป้องกัน 0
    });

    // สุ่มแจก Credit ทีละ 1
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
        userToUpdate.credit += 1; // แจก 1 Credit
        await userToUpdate.save();
        updatedUsers.push(userToUpdate);
        await Transaction.create({ user_id: userToUpdate._id, amount: 1, trans_category: 'reward' });
        remainingCreditsToDistribute -= 1;
      } else {
        break; // หยุดถ้าไม่มีผู้ใช้ที่เหมาะสม
      }
    }
    
    // แปลง Credit เป็นบาท (1 Credit = 0.5 บาท ตาม Business Plan)
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

exports.reward = async (req, res) => {
  try {
    const { vish_id } = req.body; // รับ vish_id จาก Body
    if (!mongoose.Types.ObjectId.isValid(vish_id)) {
      return res.status(400).json({ success: false, message: 'Invalid Vish ID' });
    }

    // ดึงข้อมูล Vish
    const vish = await Vish.findById(vish_id);
    if (!vish) return res.status(404).json({ success: false, message: 'Vish not found' });
   
    // ตรวจสอบว่าเป็นการบน (Bon) หรือไม่
    if (!vish.is_bon) return res.status(400).json({ success: false, message: 'This Vish is not a Bon' });

    // ตรวจสอบว่า Vish สำเร็จหรือยัง (ถ้า bon_condition เป็น success)
    if (vish.bon_condition === false && !vish.is_success) {
      return res.status(400).json({ success: false, message: 'Vish has not succeeded yet' });
    }

    // ตรวจสอบเงื่อนไข Like (ถ้า bon_condition เป็น like)
    if (vish.bon_condition === true && vish.vish_count < 10) { // สมมติว่าเงื่อนไข Like ต้องถึง 10
      return res.status(400).json({ success: false, message: 'Not enough Vish count to distribute rewards' });
    }

    // ดึงรายชื่อผู้ใช้ที่กด Vish โพสนี้ (status: true)
    const vishTimestamps = await VishTimeStamp.find({ vish_id, status: true });
    if (vishTimestamps.length === 0) {
      return res.status(400).json({ success: false, message: 'No users have Vished this post' });
    }

    const vishers = vishTimestamps.map(ts => ts.user_id.toString());
    const uniqueVishers = [...new Set(vishers)]; // ลบผู้ใช้ซ้ำ

    // คำนวณจำนวน Credit ที่แต่ละคนจะได้รับ
    const pointsPerUser = Math.floor(vish.bon_point / vish.distribution);
    if (pointsPerUser <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid distribution or bon_point' });
    }

    // ตรวจสอบว่ามีคนเพียงพอที่จะแจกหรือไม่
    if (uniqueVishers.length < vish.distribution) {
      return res.status(400).json({ success: false, message: 'Not enough users to distribute rewards' });
    }

    // สุ่มเลือกผู้ใช้
    const shuffledVishers = uniqueVishers.sort(() => 0.5 - Math.random()); // สุ่มเรียงลำดับ
    const selectedVishers = shuffledVishers.slice(0, vish.distribution); // เลือกตามจำนวน distribution

    // แจก Credit ให้ผู้ใช้ที่ถูกเลือก
    const updatedUsers = [];
    for (const userId of selectedVishers) {
      const userToUpdate = await User.findById(userId);
      if (userToUpdate) {
        userToUpdate.credit += pointsPerUser;
        await userToUpdate.save();
        updatedUsers.push(userToUpdate);
        await Transaction.create({ 
          user_id: userToUpdate._id, 
          amount: pointsPerUser, 
          trans_category: 'reward' 
        });
      }
    }

    // อัปเดต Vish ว่าแจกสำเร็จแล้ว (ถ้าต้องการ)
    vish.is_success = true;
    await vish.save();

    res.json({ 
      success: true, 
      distributed_points: pointsPerUser,
      distributed_users: updatedUsers.map(u => ({ user_id: u._id, points_added: pointsPerUser }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.buyItems = async (req, res) => {
  try {
    const { quantity } = req.body;
    const _id = req.params.item_id;
    if (!mongoose.Types.ObjectId.isValid(_id) || !quantity || quantity <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    const user = await User.findById(req.user.user_id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // สมมติว่า MerchandiseModel ยังไม่พร้อม ใช้ price แบบตัวอย่าง
    const item = { price: 10 }; // เปลี่ยนเป็น Merchandise.findById(_id) เมื่อมี Model
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