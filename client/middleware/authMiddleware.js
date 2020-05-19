function isAuth(req, res, next) {
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login')
}

function isNotAuth(req, res, next) {
    if(req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

function hi(req, res, next) {
    console.log('hi')
    next()
}

module.exports = { isAuth, isNotAuth, hi }