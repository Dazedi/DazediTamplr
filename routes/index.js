var express = require('express');
var router = express.Router();

var models = require('../models');
var auth = require('../auth');

/*
function IsAuthenticated(req, res, next){
	if(req.IsAuthenticated()){
		next();
	} else {
		next(new Error(401));
	}
};*/

router.get('/', function(req, res, next) {
  models.User.findAll().then(function(users) {
    res.render('index', {
      host: req.headers.host,
      users: users
    });
  });
});

router.get('/login',auth, function(req, res, next) {
  models.User.findAll().then(function(users) {
    res.render('login', {
      host: req.headers.host,
      users: users
    });
  });
});

module.exports = router;
