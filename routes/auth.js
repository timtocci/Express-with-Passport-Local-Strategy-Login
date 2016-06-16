/**
 * Created by Timothy Tocci on 008, Jun 8, 2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

// should change this in your app to something more random
var salt = 'sduirjtgybvn93784wr56ynbhp8wuyhmvnrspo8tuyhngupw468uwoui6htgpow8urh6tnpowproithjp3o8ru6hpo8v8mumpo8wunmbv8pwynump89sumyh8pybnw8wnmh';

router.get('/login', function(req, res, next) {
    // check for errmsg or infmsg
    res.render('login', { title: 'Express with Passport Local Strategy Login' });
});

router.post('/login', function(req,res,next){
    // change password to hash before passing it on
    var crypto = require('crypto');
    var hash = crypto.createHash('sha512');
    hash.on('readable', function() {
        var data = hash.read();
        if (data){
            req.body.password = data.toString('hex');
        }
    });
    hash.write(salt + req.body.password);
    hash.end();
    next();
});
// password should be hashed for comparison now
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login?errmsg=Bad%20user%20name%20or%20password' }),
    function(req, res) {
        res.redirect('/');
    }
);
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

router.get('/register', function(req, res, next) {
    // check for errmsg
    res.render('register', { title: 'Express with Passport Local Strategy Login' });
});
router.post('/register', function(req, res, next) {
    var data = require('../data');
    if(req.body.password === req.body.passwordagain){
        // passwords match - now hashify
        var crypto = require('crypto');
        var hash = crypto.createHash('sha512');
        hash.on('readable', function() {
            var data = hash.read();
            if (data){
                req.body.password = data.toString('hex');
            }
        });
        hash.write(salt + req.body.password);
        hash.end();
        // enter into db
        data.users.registerNewUser(req, res, function(err){
            if(err){
                res.redirect('/register?errmsg=' + encodeURIComponent(err));
            }else{
                res.redirect('/login?infmsg=1');
            }

        });
    }else{
        res.redirect('/register?errmsg=Passwords%20do%20not%20match');
    }

});

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        res.render('profile', { title: 'Express with Passport Local Strategy Login',  user: req.user });
    });

module.exports = router;