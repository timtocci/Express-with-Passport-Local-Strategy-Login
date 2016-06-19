var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');




var passport = require('passport');
var Strategy = require('passport-local').Strategy;


var headerchange = require('./mymods/hdrcng')

var data = require('./data');

passport.use(new Strategy(
    function(username, password, cb) {
        data.users.findByUsername(username, function(err, user) {
            if (err) { return cb(err); }
            if (!user) { return cb(null, false); }
            if (user.password != password) { return cb(null, false); }
            return cb(null, user);
        });
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
    data.users.findById(id, function (err, user) {
        if (err) { return cb(err); }
        cb(null, user);
    });
});
var app = express();

app.use(headerchange('Server', 'Apache/2.4.7 (Ubuntu) PHP/5.5.9-1ubuntu4.14 OpenSSL/1.0.1f'));
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy({setTo: 'PHP/5.5.9'}));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
// hurts performance
app.use(helmet.noCache({noEtag: true}));    // <-- Not crushing ETag!
app.use(helmet.dnsPrefetchControl({allow: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'dirty little secret',
    resave: false,
    saveUninitialized: false,
    name: 'PHPSESSID'
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


var routes = require('./routes/index');
//var users = require('./routes/users');
var auth = require('./routes/auth');

app.use('/', routes);
app.use('/', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    // handle CSRF token errors here
    res.status(403)
    res.send('form tampered with')
})
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
