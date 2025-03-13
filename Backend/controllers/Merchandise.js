const Merchandise = require('../models/Merchandise');

//@desc         Anything about Merchandise

//@desc         getAllMerch
//@route        GET /api/merchandise/items
//@access       Public
exports.getAllMerch = async (req, res) => {
  try {
    const items = await Merchandise.find();
    res.json({ success: true, items });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//@desc         getOneMerch 
//@route        GET /api/merchandise/items/:id
//@access       Public
exports.getOneMerch = async (req, res) => {
  try {
    const item = await Merchandise.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//@desc         addMerch 
//@route        POST /api/merchandise/items/
//@access       Private only ADMIN
exports.addMerch = async (req, res) => {
    try {
      const { price, image, merch_prop, description } = req.body;
      if (!price || !image || !merch_prop || !description) return res.status(400).json({ success: false, message: 'Invalid data' });
      const item = new Merchandise({ price, image, merch_prop, description });
      await item.save();
      res.status(201).json({ success: true, item });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

//@desc         updateMerch 
//@route        PUT /api/merchandise/items/:id
//@access       Private only ADMIN
exports.updateMerch = async (req, res) => {
    try {
      const { price, image, merch_prop, description } = req.body;
      const item = await Merchandise.findByIdAndUpdate(
        req.params.id, 
        { price, image, merch_prop, description },
        { new: true, runValidators: true }
      );
      if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
      res.json({ success: true, item });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

//@desc         deleteMerch
//@route        DELETE /api/merchandise/items/:id
//@access       Private only ADMIN
exports.deleteMerch = async (req, res) => {
  try {
    const item = await Merchandise.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};