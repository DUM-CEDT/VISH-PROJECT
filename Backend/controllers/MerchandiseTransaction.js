const mongoose = require('mongoose');
const MerchandiseTransaction = require('../models/MerchandiseTransaction');
const Merchandise = require('../models/Merchandise');
const User = require('../models/User');
const Transaction = require('../models/Transaction');


//@desc         Anything about Merchandise Transaction

//@desc         getAllMerchTrans
//@route        GET /api/merchandise/items
//@access        Private (User and Admin) Token required
exports.getAllMerchTrans = async (req, res) => {
  try {
    const transactions = await MerchandiseTransaction.find().populate('merch_id user_id');
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//@desc         getOneMerchTrans
//@route        GET /api/merchandise/items
//@access       Private (User and Admin) Token required
exports.getOneMerchTrans = async (req, res) => {
  try {
    const transaction = await MerchandiseTransaction.findById(req.params.id).populate('merch_id user_id');
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//@desc         addMerchTrans
//@route        POST /api/merchandise/items
//@access       Private (User and Admin) Token ตรวจ credit ก่อน อันนี้ซื้อของ
exports.addMerchTrans = async (req, res) => {
    try {
      const { merch_id, user_id, quantity, selected_merch_prop, tel, address } = req.body;
      if (!merch_id || !user_id || !quantity || quantity <= 0 || !selected_merch_prop || !tel || !address) {
        return res.status(400).json({ success: false, message: 'Invalid data' });
      }
  
      const item = await Merchandise.findById(merch_id);
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
  
      const user = await User.findById(user_id);
      if (!user || user._id.toString() !== req.user.user_id.toString()) return res.status(403).json({ success: false, message: 'Unauthorized' });
  
      const totalCost = item.price * quantity;
      if (user.credit < totalCost) return res.status(400).json({ success: false, message: 'Insufficient credits' });
  
      user.credit -= totalCost;
      await user.save();

      await Transaction.create({
        user_id: user._id,
        amount: -totalCost,
        trans_category: 'buyItems'
      });

      const transaction = await MerchandiseTransaction.create({ merch_id, user_id, quantity, selected_merch_prop, tel, address });
      res.json({ success: true, transaction_id: transaction._id, credits: user.credit });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

//@desc         updateMerchTrans
//@route        PUT /api/merchandise/items
//@access       Private only Admin ไว้เปลี่ยน status การจัดส่งสินค้า
exports.updateMerchTrans = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ success: false, message: 'Invalid status' });

    const transaction = await MerchandiseTransaction.findById(req.params.id).populate('user_id merch_id');
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });

    if (transaction.status === 'ยกเลิก') {
      return res.status(400).json({ success: false, message: 'Cannot update a cancelled transaction' });
    }

    if (status === 'ยกเลิก' && transaction.status !== 'ยกเลิก') {
      const user = await User.findById(transaction.user_id);
      const merchandise = await Merchandise.findById(transaction.merch_id);
      const totalCost = merchandise.price * transaction.quantity;
      user.credit += totalCost;
      await user.save();

      await Transaction.create({
        user_id: user._id,
        amount: totalCost,
        trans_category: 'refund'
      });
    }

    const updatedTransaction = await MerchandiseTransaction.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedTransaction) return res.status(404).json({ success: false, message: 'Transaction not found' });

    res.json({ success: true, transaction: updatedTransaction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


//@desc         deleteMerchTrans
//@route        DELETE /api/merchandise/items/:id
//@access       Private only Admin
exports.deleteMerchTrans = async (req, res) => {
  try {
    const transaction = await MerchandiseTransaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, message: 'Transaction not found' });
    res.json({ success: true, message: 'Transaction deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};