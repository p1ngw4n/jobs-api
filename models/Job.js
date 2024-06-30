const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, "please provide company name"],
    maxLength: 50,
  },
  position: {
    type: String,
    required: [true, "please provide position"],
    maxLength: 100,
  },
  status: {
    type: String,
    enum: {
      values: ["interview", "declinded", "pending"],
      message: "{VALUE} is not supported",
    },
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user']
  }
}, {timestamps: true});

module.exports = mongoose.model('Job', JobSchema);
