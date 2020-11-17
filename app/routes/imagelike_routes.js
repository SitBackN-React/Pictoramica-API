const express = require('express')
const passport = require('passport')
const ImageLiked = require('./../models/imageLiked')
const customErrors = require('../../lib/custom_errors')
const removeBlanks = require('../../lib/remove_blank_fields')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// CREATE imageliked
router.post('/image-liked', requireToken, (req, res, next) => {
  req.body.imageLiked.owner = req.user.id

  ImageLiked.create(req.body.imageLiked)
    .then(imageLiked => {
      res.status(201).json({imageLiked: imageLiked.toObject()})
    })
})

// DELETE imageLiked
router.delete('/image-liked/:id', requireToken, (req, res, next) => {
  const id = req.params.id

  ImageLiked.findById(id)
    .then(handle404)
    .then(imageLiked => {
      requireOwnership(req, imageLiked)
      imageLiked.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// GET all imageLiked
router.get('/image-liked', requireToken, (req, res, next) => {
  ImageLiked.find({'owner': req.user.id})
    .populate('imageLiked')
    .then(imageLiked => {
      return imageLiked.map(imageLiked => imageLiked.toObject())
    })
    .then(imageLiked => res.status(200).json({imageLiked: imageLiked}))
    .catch(next)
})

// UPDATE imageLiked
router.patch('/image-liked/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.imageLiked.owner

  ImageLiked.findById(req.params.id)
    .then(handle404)
    .then(imageLiked => {
      requireOwnership(req, imageLiked)
      return imageLiked.updateOne(req.body.imageLiked)
    })
    .then(imageLiked => res.status(200).json({imageLiked: imageLiked}))
    .catch(next)
})

module.exports = router
