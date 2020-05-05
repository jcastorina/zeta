const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const Users = new Schema({
    username: String,
    hash: String,
    salt: String,
    //password: String
})

Users.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
  
Users.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};
  
Users.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}
  
Users.methods.toAuthJSON = function() {
    return {
      _id: this._id,
      username: this.username,
      token: this.generateJWT(),
    };
};

mongoose.model('Users', Users);