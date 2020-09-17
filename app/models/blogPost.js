const mongoose = require('mongoose')
const commentSchema = require('./comment')

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  comments: [commentSchema]
}, {
  timestamps: true
})

module.exports = blogPostSchema
