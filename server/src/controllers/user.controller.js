const User = require('../models/user.model');

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    // The password field is already excluded by default due to `select: false` in the model
    const users = await User.find({});

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching users', error: error.message });
  }
};