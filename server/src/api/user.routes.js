const express = require('express');
const { getAllUsers } = require('../controllers/user.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

// This line applies the 'protect' and 'authorize' middleware to all routes in this file.
// Any user trying to access these routes must be a logged-in Admin.
router.use(protect, authorize('Admin'));

router.route('/').get(getAllUsers);

module.exports = router;