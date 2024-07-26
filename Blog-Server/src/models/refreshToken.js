const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type : String,
    required : true
  },
  email: {
    type : String,
    required : true
  },
  expiryDate: {
    type : Date,
    required : true
  },
}, {
  timestamps: true,
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema, 'RefreshToken');

module.exports = RefreshToken;