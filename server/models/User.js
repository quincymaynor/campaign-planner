const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const campaignSchema = require('./Campaign');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true
    // validate: {
    //   validator: function (password) {
    //     return password.length >= 8; // Add your validation logic here
    //   },
    //   message: 'Password must be at least 8 characters long',
    // },
  },
  gmCampaigns: [{
    type: Schema.Types.ObjectId,
    ref: "Campaign"
  }],
  // gmCampaigns: [campaignSchema],
  playerCampaigns: [{
    type: Schema.Types.ObjectId,
    ref: "Campaign"
  }],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
