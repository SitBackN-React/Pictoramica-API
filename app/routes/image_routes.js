const express = require('express')
const passport = require('passport')
const Image = require('./../models/image')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /image
router.get('/images', requireToken, (req, res, next) => {
  Image.find({'owner': req.user.id})
    .populate('image')
    .then(image => {
      return image.map(image => image.toObject())
    })
    .then(images => res.status(200).json({ images: images }))
    .catch(next)
})

// CREATE
// POST /image/
router.post('/image', requireToken, (req, res, next) => {
  req.body.image.owner = req.user.id
  Image.create(req.body.image)
    .then(image => {
      res.status(201).json({ image: image.toObject() })
    })
    .catch(next)
})

// GET /image/:id
router.get('/images/:id', requireToken, (req, res, next) => {
  Image.findById(req.params.id)
    .then(handle404)
    .then(image => res.status(200).json({ image: image.toObject() }))
    .catch(next)
})

// PATCH /image/:id
router.patch('/image/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.image.owner
  Image.findById(req.params.id)
    .then(image => {
      requireOwnership(req, image)
      return image.updateOne(req.body.image)
    })
    .then(image => res.sendStatus(204).json({ image: image }))
    .catch(next)
})

// DESTROY
// DELETE /image/:id
router.delete('/image/:id', requireToken, (req, res, next) => {
  Image.findById(req.params.id)
    .then(handle404)
    .then(image => {
      requireOwnership(req, image)
      image.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
