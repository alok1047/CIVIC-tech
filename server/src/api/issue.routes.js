const express = require('express');


const {
  createIssue,
  getIssues,
  getIssueById,
    getMyIssues,
  updateIssue,
  deleteIssue,
} = require('../controllers/issue.controller');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.route('/').get(getIssues);
router.route('/my-issues').get(protect, getMyIssues);
router.route('/:id').get(getIssueById);

// Private routes
router.route('/').post(protect, createIssue);

// Routes restricted to Staff and Admins
router.route('/:id').put(protect, authorize('Staff', 'Admin'), updateIssue);

// Route restricted to only Admins
router.route('/:id').delete(protect, authorize('Admin'), deleteIssue);

module.exports = router;