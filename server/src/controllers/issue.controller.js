const Issue = require('../models/issue.model');

// @desc    Create a new issue
// @route   POST /api/issues
// @access  Private (Citizen, Staff, Admin)
exports.createIssue = async (req, res) => {
  try {
    // The user's ID is attached to req.user by the 'protect' middleware
    req.body.reportedBy = req.user.id;
    
    const issue = await Issue.create(req.body);

    res.status(201).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating issue', error: error.message });
  }
};

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('reportedBy', 'name'); // Populate user's name

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching issues', error: error.message });
  }
};

// @desc    Get a single issue
// @route   GET /api/issues/:id
// @access  Public
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate('reportedBy', 'name');

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching issue', error: error.message });
  }
};

// @desc    Update an issue (e.g., change status)
// @route   PUT /api/issues/:id
// @access  Private (Staff, Admin)
exports.updateIssue = async (req, res) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }
    
    // We can add more checks here later, e.g., if user is authorized to update

    issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating issue', error: error.message });
  }
};

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
// @access  Private (Admin)
exports.deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found' });
    }
    
    await issue.deleteOne(); // Mongoose 6+ uses deleteOne()

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting issue', error: error.message });
  }
};
// @desc    Get issues for the logged-in user
// @route   GET /api/issues/my-issues
// @access  Private (Citizen)
exports.getMyIssues = async (req, res) => {
    try {
      // req.user.id is available from the 'protect' middleware
      const issues = await Issue.find({ reportedBy: req.user.id }).sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        count: issues.length,
        data: issues,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error fetching user issues', error: error.message });
    }
  };