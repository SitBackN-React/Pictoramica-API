const mongoose = require('mongoose')

const imageLikedSchema = new mongoose.Schema({
  liked: {
    type: Boolean,
    required: true
  },
  likedImageId: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('ImageLiked', imageLikedSchema)
