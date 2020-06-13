const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Users = mongoose.model('Users');
const fs = require('fs');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const multer = require('multer')
const upload = multer({limits:{fileSize:10000000}}).single('imageFile')
const sharp = require('sharp')
const uuid = require('uuid').v4


router.all('/', function (req, res, next) {
    console.log('req received on \'/\'')
    next() // pass control to the next handler
})

//////////////////////////
//  POST ROUTES         //
//////////////////////////

router.post('/register', auth.isNotAuth, (req, res, next) => {
    const { body } = req;
    console.log(body)
    const finalUser = new Users(body);
   
    finalUser.setPassword(body.password);
    console.log(finalUser)
    return finalUser.save()
      .then(() => {res.json({ body: finalUser.toAuthJSON() })})
      .catch((err)=>{console.log('error saving new user')})
});


router.post('/login', auth.isNotAuth, 
    passport.authenticate('local', { successRedirect: '/about',
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

router.post('/delete', auth.isAuth, (req,res)=>{
    let id = req._passport.session.user 
    let fileName = Object.keys(req.body)[0]
    fs.unlink('./client/uploads/'+fileName,()=>{
        console.log('deleted file: ', fileName)
    })
    Users.findByIdAndUpdate(id,
    { $pull: {  images: fileName } },(err,result)=>{
        if(err){
          console.log(err)
        }else {
            console.log('deleted key: ', fileName)
        }
    })  
})

router.post('/upload', auth.isAuth, (req,res)=>{
    upload(req, res, async (err) =>{
    if(err||req.file === undefined){
        console.log('err',err)
        res.send('Whoopsy, didn\'t work..  Maybe try again?')
    } else {
        let id = req._passport.session.user        
        let fileName = uuid() + '.png' 
        Users.findByIdAndUpdate(id,
            { $push: {  images: fileName } },(err,result)=>{
                if(err){
                  console.log(err)
                }else {
                    console.log('updated: '+fileName)
                }
        })      
        
        const image = await sharp(req.file.buffer)       
        .png({
            quality: 40,
        })
        .toFile('./client/uploads/'+fileName)
        .catch( err => { console.log('error: ' + err)})  
    }
    }
    )   
})

//////////////////////////
//  GET ROUTES          //
//////////////////////////

//attempted flash message hack
//router.get('*', function(req,res,next){
//    res.locals.error = req.flash('error');
//    next();
//})

router.get('/register', auth.isNotAuth, (req,res)=>{
    //res.render('register.ejs', { title: 'Z E T A'});
    console.log('register accessed')
    res.json({"test":"you did it"})
    
})

async function waitForFlash(req){
    let flash = await req.flash('error')   
    if(flash.length>0){
        return flash
    } else {
        return [' ']
    }
}

router.get('/login', auth.isNotAuth, (req,res)=>{
    waitForFlash(req)
    .then(flash=>res.render('login.ejs', { message: flash[0], title: 'topsecretproject'}))
    .catch(e=>console.log('error with the flash message',e))
})

router.get('/', auth.isAuth, (req,res)=>{

   
   
        Users.find((err, users)=>{
       // console.log(users)
        let name = req.user.username 
        let all = [];
        if (err) return console.err(err);

        for(let i in users){
            all.push(users[i].username)
        }
        
        res.render('main.ejs', { title: 'Z E T A ('+name+')', message: name, online: all })
    })
})

router.get('/myChar', auth.isAuth, (req,res)=>{
        
    Users.find((err, users)=>{
        
        let name = req.user.username 
        let all = [];
        if (err) return console.err(err);

        for(let i in users){
            all.push(users[i].username)
        }
        
        let id = req._passport.session.user    
   
        Users.findById(id,(err,user)=>{
            if (err) { console.log(err) }
            else {
                const { images } = user
                res.json({"message": name, "images": images, "num": images.length})
                //res.render('myChar.ejs', { title: 'Z E T A ('+name+')', message: name, online: all, images: images, num: images.length })
            }
        })        
    })
})

router.get('/close', auth.isAuth, (req,res)=>{
    res.render('close.ejs')
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

router.get('/join', auth.isAuth, (req,res)=>{
    let name = req.user.username;
    res.render('join.ejs', { title: 'Z E T A ('+name+')', message: name})
})

router.get('/game', auth.isAuth, (req,res)=>{
    let name = req.user.username;
    res.render('game.ejs', { title: 'Z E T A ('+name+')', message: name})
})



router.get('/upload', auth.isAuth, (req,res)=>{
    
    Users.find((err, users)=>{
        if (err) return console.err(err);
        let all = []
        for(let i in users){
            all.push(users[i].username)
        }
        let name = req.user.username;
     
        res.render('upload.ejs', { title: 'Z E T A ('+name+')', message: name, online: all })
   })
  
})


//This used to work but stopped working when i did the cookie refactor
//router.delete('/logout', (req, res) =>{
//    req.logOut()
//    res.redirect('/login')
//})

//i do it with a str8 up post now
router.post('/logout', (req, res) =>{
    req.logOut()
    console.log('user logged out')
    res.redirect('/login')
})

//router.get('/users/:userId', function (req, res) {
//    console.log(req);
//    res.send(req.params)
//})


module.exports = router;