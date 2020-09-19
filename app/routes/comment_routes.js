const express = require('express')
const passport = require('passport')
const router = express.Router()

const Blog = require('./../models/blog')

const customErrors = require('./../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authentication('bearer', { session: false })

// CREATE a new comment
router.post('/blogs/:blogId/blogPosts/:blogPostId/comments', requireToken, (req, res, next) => {
  // assign user's id to the comment's owner property
  req.body.comment.owner = req.user.id
  // get the comment data from the body of the request
  const commentData = req.body.comment
  // get the blog id from the params
  const blogId = req.params.blogId
  // get the blog post id from the params
  const blogPostId = req.params.blogPostId
  // find the blog by its id
  Blog.findById(blogId)
    .then(handle404)
    // Then find specific blogPost by id
    .then(blog => {
      // and push the incoming data into the comments object
      blog.blogPosts.id(blogPostId).comments.push(commentData)
      // save and return the blog object
      return blog.save()
    })
    // display created message and send back blog info to user
    .then(blog => res.status(201).json({ blog: blog }))
    .catch(next)
})
