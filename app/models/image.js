const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  tag: {
    type: String
  },

  caption: {
    type: String
  },

  imageUrl: {
    type: String,
    required: true
  },

  like: {
    type: Boolean
  },

  forSale: {
    type: Boolean
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Image', imageSchema)
