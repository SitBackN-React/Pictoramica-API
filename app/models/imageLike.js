const mongoose = require('mongoose')

const imageLikeSchema = new mongoose.Schema({
  liked: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = imageLikeSchema
