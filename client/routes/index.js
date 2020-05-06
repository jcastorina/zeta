const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');

const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.all('/', function (req, res, next) {
    console.log('req received on \'/\'')
    next() // pass control to the next handler
  })

//////////////////////////
//  POST ROUTES         //
//////////////////////////

router.post('/register', auth.isNotAuth, (req, res, next) => {
    const { body } = req;
    
    const finalUser = new Users(body);
   
    finalUser.setPassword(body.password);
    console.log(finalUser)
    return finalUser.save()
      .then(() => { res.redirect('/')})//res.json({ body: finalUser.toAuthJSON() }));
});

router.post('/login', auth.isNotAuth,
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.post('/newParty', auth.isAuth, (req,res, next)=>{
    const { body } = req;
    console.log(body);
    res.redirect('/');
})

router.post('/newChar', auth.isAuth, (req,res, next)=>{
    const { body } = req;
    console.log(body);
    res.redirect('/');
})

//////////////////////////
//  GET ROUTES          //
//////////////////////////

router.get('/register', auth.isNotAuth, (req,res)=>{
    res.render('register.ejs', { title: 'Z E T A'});
})

router.get('/login', auth.isNotAuth, (req,res)=>{
    res.render('login.ejs', { title: 'Z E T A'});
})

router.get('/', auth.isAuth, (req,res)=>{
        
    Users.find((err, users)=>{
        
        let name = req.user.username 
        let all = [];
        if (err) return console.err(err);

        for(let i in users){
            all.push(users[i].username)
        }
        
        res.render('main.ejs', { title: 'Z E T A ('+name+')', message: name, online: all })
    })
})

router.get('/newParty', auth.isAuth, (req,res)=>{
    Users.find((err, users)=>{
        if (err) return console.err(err);
        let all = []
        for(let i in users){
            all.push(users[i].username)
        }
        let name = req.user.username;
        res.render('newParty.ejs', { title: 'Z E T A ('+name+')', message: name, online: all })
    })
   
})

router.get('/newChar', auth.isAuth, (req,res)=>{
    let name = req.user.username;
    res.render('newChar.ejs', { title: 'Z E T A ('+name+')', message: name})
})

//This used to work but stopped working when i did the cookie refactor
//router.delete('/logout', (req, res) =>{
//    req.logOut()
//    res.redirect('/login')
//})

//i do it with a str8 up post now
router.post('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/login')
})

//router.get('/users/:userId', function (req, res) {
//    console.log(req);
//    res.send(req.params)
//})

module.exports = router;