var mongoose = require('mongoose');
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const Users = mongoose.model('Users');

passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));