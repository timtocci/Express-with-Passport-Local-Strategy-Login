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
router.get('/index.php', function (req, res, next) {
//router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
    if (req.user) {
        req.user.name = xssFilters.inHTMLData(req.user.name);
        req.user.email = xssFilters.inHTMLData(req.user.email);
        req.user.is = xssFilters.inHTMLData(req.user.id);
    }
    res.render('index', {title: 'Express with Passport Local Strategy Login', user: req.user});
});
router.get('/htaccess', function (req, res, next) {
    // look! John forgot to erase the old one!
    var responsestr = 'RewriteEngine On';
    responsestr += 'RewriteCond %{REQUEST_FILENAME} !-f \n';
    responsestr += 'RewriteCond %{REQUEST_FILENAME} !-d \n';
    responsestr += 'RewriteRule ^(.*)$ index.php [QSA,L] \n';
    responsestr += '; Get John to refactor this so that ONLY \n';
    responsestr += '; authenticated users can access the public dir';
    res.send(responsestr);
});


module.exports = router;
