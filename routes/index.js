var express = require('express');
var router = express.Router();

// https://github.com/yahoo/xss-filters/wiki
var xssFilters = require('xss-filters');

/* GET home page. */
router.get('/', function (req, res, next) {
//router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {

    if (req.user) {
        // maybe something was overlooked
        req.user.name = xssFilters.inHTMLData(req.user.name);
        req.user.email = xssFilters.inHTMLData(req.user.email);
        req.user.is = xssFilters.inHTMLData(req.user.id);
    }
    res.render('index', {title: 'Express with Passport Local Strategy Login', user: req.user});
});

module.exports = router;
