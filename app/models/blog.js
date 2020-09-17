const mongoose = require('mongoose')

const blogPostSchema = require('./blogPost')
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  blogPosts: [blogPostSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Blog', blogSchema)
