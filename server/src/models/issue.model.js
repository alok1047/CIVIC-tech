const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  // We will define this in the next PR
});

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;