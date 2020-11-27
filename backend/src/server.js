const PORT = process.env.PORT || 3080;
require('dotenv').config()  
const cors = require("cors")
// Express
const express = require("express")
const app = express()
const endpoints = express.Router()
app.use('/api', endpoints)

// body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:false})) 
const jsonParser = bodyParser.json()  

// MongoClient
const MongoDBClient = require('./mongoClient')
const DATABASE_NAME = 'marketplace'
const { findAll, findOne, insertOne, deleteAll } = require('./controller')

app.get('/', (_, res) => {
    res.send(process.env.SECRET_KEY);
})

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))

// Initialize DB 
MongoDBClient.initialize(DATABASE_NAME, db => { 
    // Cors
    app.use(cors())
    const createCheckoutSession = require('./stripe')
 
    // collections
    const products = db.collection("products")
    const users = db.collection("users")
    const orders = db.collection("orders")

    // Routes - GET
    endpoints.get('/products', (req, res) => findAll(products, req, res)) 
    endpoints.get('/users', (req, res) => findAll(users, req, res)) 
    endpoints.get('/orders', (req, res) => findAll(orders, req, res))
  endpoints.get('/user', (req, res) => findOne(users, req, res))
  
    // Routes - POST
    endpoints.post('/orders/add', jsonParser, (req, res) => insertOne(orders, req, res))  
    endpoints.post('/users/add', jsonParser, (req, res) => insertOne(users, req, res)) 

    // to remove all documents from a collection
    endpoints.get('/orders/delete', (req, res) => deleteAll(orders, req, res)) 
    endpoints.get('/users/delete', (req, res) => deleteAll(users, req, res)) 

})

  // Stripe
const stripe = require('stripe')(process.env.SECRET_KEY);
endpoints.post('/create-checkout-session', jsonParser, async (req, res) => { 
  try { 
    stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    }).then(session => res.status(200).send({ id: session.id }))
  } catch (err) { 
    return res.status(500).send(`failed opening stripe sessions ${err}`);
  }  
})
