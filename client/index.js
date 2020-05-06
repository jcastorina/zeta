const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const crypto = require('crypto');
//const cookieParser = require('cookie-parser');

require('dotenv').config();

const flash = require('express-flash');
//const path = require('path');
//const methodOverride = require('method-override');
const app = express();
app.set('views', './client/views');
app.set('view engine', 'ejs');
//app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./client/views'));

const mongoDB = 'mongodb+srv://jcastorina:dbUserPassword@userdata-echiv.mongodb.net/users?retryWrites=true&w=majority'
const connection = mongoose.createConnection(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })


require('./models/User.js')

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

const sessionStore = new MongoStore({ 
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { 
        expires: Date.now() + 1000
    },
    
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
//app.use(methodOverride('_method'))

app.use(require('./routes'));

PORT = 3000;

app.listen(PORT, ()=>{console.log(`app listening on port ${PORT}`)})