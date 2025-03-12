const express = require('express');
const router = express.Router();
const {
  getAllMerch,
  getOneMerch,
  addMerch,
  updateMerch,
  deleteMerch
} = require('../controllers/Merchandise');
const {
  getAllMerchTrans,
  getOneMerchTrans,
  addMerchTrans,
  updateMerchTrans,
  deleteMerchTrans
} = require('../controllers/MerchandiseTransaction');
const auth = require('../middleware/auth');

router.get('/items', getAllMerch);
router.get('/items/:id', getOneMerch);
router.post('/items', auth, addMerch);
router.put('/items/:id', auth, updateMerch);
router.delete('/items/:id', auth, deleteMerch);

router.get('/transactions', auth, getAllMerchTrans);
router.get('/transactions/:id', auth, getOneMerchTrans);
router.post('/transactions', auth, addMerchTrans);
router.put('/transactions/:id', auth, updateMerchTrans);
router.delete('/transactions/:id', auth, deleteMerchTrans);

module.exports = router;