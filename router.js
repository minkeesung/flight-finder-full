const Authentication = require('./controllers/authentication');
const trips = require('./controllers/trips')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'super secret code is abc123'})
  })
  app.post('/api/signin', requireSignin, Authentication.signin)
  app.post('/api/signup', Authentication.signup)
  app.post('/api/savetrip', trips.savetrip )
}
