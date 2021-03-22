// import image from 'image'

// require necessary NPM packages
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// require route files
// const exampleRoutes = require('./app/routes/example_routes')
const userRoutes = require('./app/routes/user_routes')
const imageRoutes = require('./app/routes/image_routes')
const blogRoutes = require('./app/routes/blog_routes')
const postRoutes = require('./app/routes/post_routes')
const commentRoutes = require('./app/routes/comment_routes')
const cartItemRoutes = require('./app/routes/cartItem_routes')
const awsRoutes = require('./app/routes/aws_routes')
// const uploadRoutes = require('./app/routes/upload_routes')
const imageLikeRoutes = require('./app/routes/imagelike_routes')
const postLikeRoutes = require('./app/routes/postlike_routes')
// require middleware
const errorHandler = require('./lib/error_handler')
const replaceToken = require('./lib/replace_token')
const requestLogger = require('./lib/request_logger')
// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require('./config/db')

// require configured passport authentication middleware
const auth = require('./lib/auth')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4741
const clientDevPort = 7165

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  useCreateIndex: true
})

// instantiate express application object
const app = express()
// Sets up the server side endpoint to create the Checkout session
// Implements secret key
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51HobYFEybVIVldfcky1ZlNWny1FvFyRV5pmg6ijHd9hR4jEM58dxUfpLiqpVZC3glcSfeAhryGt221Q47wiHb3br00zqZOL5Vy')

app.use(express.static('.'))

// app.post('/checkout', async (req, res) => {
// // const paymentIntent = await stripe.paymentIntents.create({
// //     amount: 1000,
// //     currency: 'usd',
// //     payment_method_types: ['card'],
// //     receipt_email: 'jenny.rosen@example.com'
// // })
// // console.log(paymentIntent)
// })

const YOUR_DOMAIN = `http://localhost:${clientDevPort}/#/`

// app.post('/create-checkout-session', async (req, res) => {
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Image',
//               images: ['']
//             },
//             unit_amount: 20
//           },
//           quantity: 1
//         }
//       ],
//       mode: 'payment',
//       success_url: `${YOUR_DOMAIN}?success=true`,
//       cancel_url: `${YOUR_DOMAIN}?canceled=true`
//     })
//     res.json({ id: session.id })
//   } catch (e) {
//     res.status(400)
//     return res.send({
//       error: {
//         message: e.message
//       }
//     })
//   }
// })
app.post('/create-checkout-session', (req, res) => {
  stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Image',
            images: ['']
          },
          unit_amount: 20
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  })
    .then(session => res.json({ id: session.id }))
    .catch(() => res.status(400))
})
// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken)

// register passport authentication middleware
app.use(auth)

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
// app.use(exampleRoutes)
app.use(userRoutes)
app.use(imageRoutes)
app.use(blogRoutes)
app.use(postRoutes)
app.use(commentRoutes)
app.use(cartItemRoutes)
app.use(awsRoutes)
// app.use(uploadRoutes)
app.use(imageLikeRoutes)
app.use(postLikeRoutes)
// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler)

// run API on designated port (4741 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
