const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const campaignSchema = new Schema({
  campaignAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  notes: [
    {
      noteText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10000,
      },
      noteAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Campaign = model('Campaign', campaignSchema);

module.exports = Campaign;
