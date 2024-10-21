const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  institution: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Institution', 
    required: true 
  },
  criteria: [{
    name: { type: String, required: true },
    rating: { type: Number, required: true }
  }],
  totalRating: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  date: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
