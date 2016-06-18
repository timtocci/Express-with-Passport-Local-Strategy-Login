/**
 * Created by Timothy Tocci on 008, Jun 8, 2016.
 */
var express = require('express');
var router = express.Router();
var passport = require('passport');

// csurf stuff
// https://www.npmjs.com/package/csurf
var bodyParser = require('body-parser');
var csurf = require('csurf');
var csrfProtection = csurf({cookie: false});
var parseForm = bodyParser.urlencoded({extended: false});

// https://github.com/yahoo/xss-filters/wiki
var xssFilters = require('xss-filters');

// should change this in your app to something more random
var salt = 'sduirjtgybvn93784wr56ynbhp8wuyhmvnrspo8tuyhngupw468uwoui6htgpow8urh6tnpowproithjp3o8ru6hpo8v8mumpo8wunmbv8pwynump89sumyh8pybnw8wnmh';

router.get('/login', csrfProtection, function (req, res, next) {
    // check for errmsg or infmsg
    console.log(req.query);
    var message = {};
    if (req.query.errmsg) {
        message.style = 'err';
        message.text = xssFilters.inHTMLData(req.query.errmsg);
    }
    if (req.query.infmsg) {
        message.style = 'inf';
        message.text = xssFilters.inHTMLData(req.query.infmsg);
    }
    if (req.query.errmsg && req.query.infmsg) {
        // get var tampering maybe log attempt
        res.status(400);
        res.redirect('/');
    }
    res.render('login', {
        title: 'Express with Passport Local Strategy Login',
        message: message,
        csrfToken: req.csrfToken()
    });
});

router.post('/login', parseForm, csrfProtection, function (req, res, next) {
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

router.get('/register', csrfProtection, function (req, res, next) {
    // check for errmsg
    var message = {};
    if (req.query.errmsg) {
        message.style = 'err';
        message.text = xssFilters.inHTMLData(req.query.errmsg);
    }
    res.render('register', {
        title: 'Express with Passport Local Strategy Login',
        message: message,
        csrfToken: req.csrfToken()
    });
});
router.post('/register', parseForm, csrfProtection, function (req, res, next) {
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
                res.redirect('/login?infmsg=Registration%20Successful');
            }
        });
    }else{
        res.redirect('/register?errmsg=Passwords%20do%20not%20match');
    }

});

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res){
        if (req.user) {
            req.user.name = xssFilters.inHTMLData(req.user.name);
            req.user.email = xssFilters.inHTMLData(req.user.email);
            req.user.is = xssFilters.inHTMLData(req.user.id);
        }
        res.render('profile', { title: 'Express with Passport Local Strategy Login',  user: req.user });
    });

module.exports = router;