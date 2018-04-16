const Trip = require('../models/Trip')

exports.savetrip = function(req, res, next) {
  console.log(req.user)
  console.log(req)
  const ticket_price = req.body.ticket_price
  const carrier = req.body.carrier
  const arrival_time = req.body.arrival_time
  const departure_time = req.body.departure_time
  const destination = req.body.destination
  const origin = req.body.origin

  const trip = new Trip({
    ticket_price: ticket_price,
    carrier: carrier,
    arrival_time: arrival_time,
    departure_time: departure_time,
    destination: destination,
    origin: origin
  })

  trip.save()
}

  //
  // ticket_price: String,
  // carrier: String,
  // arrival_time: String,
  // departure_time: String
  //
  // User.findOne({ email: email }, function(err, existingUser) {
  //   if (err) { return next(err)}
  //
  //   if (existingUser) {
  //     return res.status(422).send({ error: 'Email is in use'})
  //   }
  //
  //   const user = new User({
  //     email: email,
  //     password: password
  //   })
  //
  //   user.save(function(err) {
  //     if (err) {
  //       console.log("sdofsfioj", err)
  //       return next(err) }
  //
  //     res.json({token: tokenForUser(user) });
  //   });
  // })
