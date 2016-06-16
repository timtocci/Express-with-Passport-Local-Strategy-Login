var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
//router.get('/', require('connect-ensure-login').ensureLoggedIn(), function(req, res, next) {
  res.render('index', { title: 'Express with Passport Local Strategy Login', user: req.user });
});

module.exports = router;
