const express = require('express');
const mongoose = require('mongoose');
//const { Schema } = mongoose;
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const http = require('http');
const https = require('https');
const fs = require('fs');
const terminal = require('web-terminal');
const multer = require('multer')
const sharp = require('sharp')
const uuid = require('uuid')

//const crypto = require('crypto');
const cookieParser = require('cookie-parser');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}

require('dotenv').config();

const flash = require('connect-flash');//changed from express to connect
//const path = require('path');
//const methodOverride = require('method-override');
const app = express();
app.set('views', './client/views');
app.set('view engine', 'ejs');
app.use(cookieParser());//added
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client/views'));
app.use(express.static('./uploads/'))//saving imgs here

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

HTTP_PORT = 8080;
HTTPS_PORT = 8443;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);
terminal(httpServer);

httpServer.listen(HTTP_PORT, ()=>{console.log(`HTTP listening on port ${HTTP_PORT}`)})
httpsServer.listen(HTTPS_PORT, ()=>{console.log(`HTTPS listening on port ${HTTPS_PORT}`)})
console.log(`web terminal accessible at ${HTTP_PORT}/terminal`)


//app.listen(PORT, ()=>{console.log(`app listening on port ${PORT}`)})