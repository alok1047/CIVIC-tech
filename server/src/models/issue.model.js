const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the issue'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Pothole', 'Streetlight', 'Sanitation', 'Water Leakage', 'Other'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  imageUrl: {
    type: String,
    // We will handle image uploads later, for now it's just a string
  },
  status: {
    type: String,
    enum: ['Submitted', 'Acknowledged', 'In Progress', 'Resolved', 'Verified Resolved'],
    default: 'Submitted',
  },
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  // We will add fields for upvotes, comments, etc. in later PRs
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create a geospatial index for efficient location-based queries
IssueSchema.index({ location: '2dsphere' });

const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;
