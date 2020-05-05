const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const flash = require('express-flash');
//const path = require('path');
const methodOverride = require('method-override');
const app = express();

var mongoDB = 'mongodb+srv://jcastorina:dbUserPassword@userdata-echiv.mongodb.net/users?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true },);

app.set('views', './client/views');
app.set('view engine', 'ejs');

app.use(express.static('./client/views'));
//app.use('/views', express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({ 
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))

require('./models/User');
require('./middleware/passport-config.js');

const Users = mongoose.model('Users');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
      done(err, user);
    });
});

app.use(require('./routes'));

PORT = 3000;

app.listen(PORT, ()=>{console.log(`app listening on port ${PORT}`)})