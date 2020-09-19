const express = require('express')
const passport = require('passport')
const router = express.Router()

const Blog = require('./../models/blog')

const customErrors = require('./../../lib/custom_errors')
const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

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
    // respond to user with CREATED message and blog info
    .then(blog => res.status(201).json({ blog: blog }))
    .catch(next)
})

// UPDATE comment
router.patch('/blogs/:blogId/blogPosts/:blogPostId/comments/:commentId', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.comment.owner
  const blogId = req.params.blogId
  const blogPostId = req.params.blogPostId
  const commentId = req.params.commentId
  const commentData = req.body.comment

  // find the blog by its Id
  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      requireOwnership(req, blog)
      // find the blog post by its id and its comment by id and set the incoming comment data
      blog.blogPosts.id(blogPostId).comments.id(commentId).set(commentData)
      // save and return the updated blog
      return blog.save()
    })
    // respond to user with OK message and the updated blog info
    .then(blog => res.status(200).json({ blog: blog }))
    .catch(next)
})

// DELETE comment
router.delete('/blogs/:blogId/blogPosts/:blogPostId/comments/:commentId', requireToken, (req, res, next) => {
  // get blog id from the params
  const blogId = req.params.blogId
  // get the blog post id from the params
  const blogPostId = req.params.blogPostId
  // get the comment id from the params
  const commentId = req.params.commentId
  // find the blog by its id
  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      // require ownership
      requireOwnership(req, blog)
      // remove the specific comment by inserting the blog post id, and comment id
      blog.blogPosts.id(blogPostId).comments.id(commentId).remove()
      // save and return the blog
      return blog.save()
    })
    // respond to user with NO CONTENT message
    .then(() => res.sendStatus(204))
    .catch(next)
})

// SHOW a comment
router.get('/blogs/:blogId/blogPosts/:blogPostId/comments/:commentId', (req, res, next) => {
  // get blog id from params
  const blogId = req.params.blogId
  // get blog post id from params
  const blogPostId = req.params.blogPostId
  // get comment id from params
  const commentId = req.params.commentId
  // find blog by its id
  Blog.findById(blogId)
    .then(handle404)
    .then(blog => {
      // assign comment object to comment
      let comment = blog.blogPosts.id(blogPostId).comments.id(commentId)
      // handle404 for comment
      comment = handle404(comment)
      // respond to user with OK message and comment info
      res.status(200).json({ comment: comment })
    })
    .catch(next)
})

module.exports = router
