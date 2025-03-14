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
    const { name, price, image, merch_props, description } = req.body;
    if (!name || !price || !image || !merch_props || !description) {
      return res.status(400).json({ success: false, message: 'Invalid data' });
    }

    if (!Array.isArray(merch_props) || merch_props.length === 0) {
      return res.status(400).json({ success: false, message: 'merch_props must be a non-empty array' });
    }
    for (let prop of merch_props) {
      if (!prop.type || !Array.isArray(prop.options) || prop.options.length === 0) {
        return res.status(400).json({ success: false, message: 'Each merch_prop must have a type and non-empty options array' });
      }
    }

    const merchandise = await Merchandise.create({ name, price, image, merch_props, description });
    res.status(201).json({ success: true, item: merchandise });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//@desc         updateMerch 
//@route        PUT /api/merchandise/items/:id
//@access       Private only ADMIN
exports.updateMerch = async (req, res) => {
  try {
    const { name, price, image, merch_props, description } = req.body;
    if (!name && !price && !image && !merch_props && !description) {
      return res.status(400).json({ success: false, message: 'At least one field is required for update' });
    }

    if (merch_props) {
      if (!Array.isArray(merch_props) || merch_props.length === 0) {
        return res.status(400).json({ success: false, message: 'merch_props must be a non-empty array' });
      }
      for (let prop of merch_props) {
        if (!prop.type || !Array.isArray(prop.options) || prop.options.length === 0) {
          return res.status(400).json({ success: false, message: 'Each merch_prop must have a type and non-empty options array' });
        }
      }
    }

    const merchandise = await Merchandise.findByIdAndUpdate(
      req.params.id,
      { name, price, image, merch_props, description },
      { new: true, runValidators: true }
    );
    if (!merchandise) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, item: merchandise });
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