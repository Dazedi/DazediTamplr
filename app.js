var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var LocalStrategy = require('passport-local').Strategy;
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
//var passportAuth = require('./auth');

var routes = require('./routes/index');
var apiUser = require('./routes/api_user');
var apiHT = require('./routes/api_ht');
var apiBlog = require('./routes/api_blog');
var apiPost = require('./routes/api_post');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret: 'tamplr', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/user', apiUser);
app.use('/api/ht', apiHT);
app.use('/api/blog', apiBlog);
app.use('/api/post', apiPost);

var models = require('./models');

function findByUsername(username, fn) {
  models.User.findAll().then(function(users){
    for (var i = 0, len = users.length; i < len; i++) {
      var user = users[i];
      if (user.username === username) {
        return fn(null, user);
      }
    }
    return fn(null, null);
  })
}

passport.use(new BasicStrategy({
  realm: "tamplr",
  },
  function(username, password, done) {
    process.nextTick(function() {
      findByUsername(username, function(err, user) {
        if(err) { return done(err); }
        if(!user) {return done(null, false); }
        if(user.password != password) { return done(null, false); }
        return done(null, user);
      })
    });
  })
);

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
  },
  function(username, password, done) {
    //process.nextTick(function() {
    findByUsername(username, function(err, user) {
      if(err) { return done(err); }
      if(!user) {return done(null, false); }
      if(user.password != password) { return done(null, false); }
      return done(null, user);
    })
    //});
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


/*app.use(express.basicAuth(function(user, pass, callback){
    var result = (user === 'testUser' && pass === 'testPass');
    callback(null , result);
}));*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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
