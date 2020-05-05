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


router.post('/register', auth.isNotAuth, (req, res, next) => {
    const { body } = req;

    const finalUser = new Users(body);
  
    finalUser.setPassword(body.password);
  
    return finalUser.save()
      .then(() => { res.redirect('/')})//res.json({ body: finalUser.toAuthJSON() }));
});

router.get('/create', auth.isAuth, (req,res)=>{
    Users.find((err, users)=>{
        if (err) return console.err(err);
        let all = []
        for(let i in users){
            all.push(users[i].username)
        }
        let name = req.user.username;
        res.render('create.ejs', { title: 'Z E T A ('+name+')', message: name, online: all })
    })
   
})

//POST ROUTE!!!!!!!!!!!!!!!!!!!!!
router.post('/create', auth.isAuth, (req,res)=>{
   
    Users.find((err, users)=>{
        if (err) return console.err(err);
        let all = []
        for(let i in users){
            all.push(users[i].username)
        }
        let name = req.user.username;

        res.render('create.ejs', { title: 'Z E T A ('+name+')', message: name, online: all })
    })
   
})

router.post('/login', auth.isNotAuth,
    passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

router.get('/', auth.isAuth, (req,res)=>{
        
    Users.find((err, users)=>{
        
        let name = req.user.username 
        let all = [];
        if (err) return console.err(err);

        for(let i in users){
            all.push(users[i].username)
        }
        console.log(all,'online')
        res.render('index', { title: 'Z E T A ('+name+')', message: name, online: all })
    })
})

router.get('/login', auth.isNotAuth, (req,res)=>{
    res.render('login.ejs', { title: 'Z E T A'});
})

router.get('/register', auth.isNotAuth, (req,res)=>{
    res.render('register.ejs', { title: 'Z E T A'});
})

router.get('/users/:userId', function (req, res) {
    console.log(req);
    res.send(req.params)
})

router.delete('/logout', (req, res) =>{
    req.logOut()
    res.redirect('/login')
})

module.exports = router;