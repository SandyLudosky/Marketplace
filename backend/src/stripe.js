const stripe = require('stripe')(process.env.SECRET_KEY);

const createCheckoutSession = (req, res) => { 
  stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/',
    })
    .then(session => res.status(200).send({ id: session.id }))
    .catch(err => res.send(`Failed to open stripe session ${err}`))
}
module.exports = createCheckoutSession