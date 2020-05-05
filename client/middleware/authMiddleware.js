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

module.exports = { isAuth, isNotAuth }